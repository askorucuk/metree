import type { Node, Edge } from '@xyflow/react';
import type { FamilyTreeData, Person } from '../types';

const NODE_WIDTH = 220;
const SPOUSE_GAP = 20;
const FAMILY_GAP = 50;
const LEVEL_HEIGHT = 300;

function unitWidth(hasSpouse: boolean) {
  return hasSpouse ? NODE_WIDTH * 2 + SPOUSE_GAP : NODE_WIDTH;
}

interface CoupleUnit {
  id: string;
  primary: string;
  spouse?: string;
  level: number;
}

export function generateLayout(
  data: FamilyTreeData,
  onSelect: (person: Person) => void
): { nodes: Node[]; edges: Edge[] } {
  const personMap = new Map(data.persons.map(p => [p.id, p]));
  const childrenOf = new Map<string, Set<string>>();
  const parentsOf = new Map<string, string[]>();
  const spouseMap = new Map<string, string>();

  for (const rel of data.relationships) {
    if (rel.type === 'parent') {
      if (!childrenOf.has(rel.from)) childrenOf.set(rel.from, new Set());
      childrenOf.get(rel.from)!.add(rel.to);
      if (!parentsOf.has(rel.to)) parentsOf.set(rel.to, []);
      parentsOf.get(rel.to)!.push(rel.from);
    } else if (rel.type === 'spouse') {
      spouseMap.set(rel.from, rel.to);
      spouseMap.set(rel.to, rel.from);
    }
  }

  // Step 1: Assign levels via BFS from roots
  const levels = new Map<string, number>();
  const hasParents = new Set(parentsOf.keys());
  const queue: { id: string; level: number }[] = [];

  for (const p of data.persons) {
    if (!hasParents.has(p.id)) {
      // Only treat as root if spouse also has no parents (or no spouse)
      // Otherwise this person is a "married-in" spouse and gets level from partner
      const spouse = spouseMap.get(p.id);
      if (!spouse || !hasParents.has(spouse)) {
        queue.push({ id: p.id, level: 0 });
      }
    }
  }

  while (queue.length > 0) {
    const { id, level } = queue.shift()!;
    if (levels.has(id)) continue;
    levels.set(id, level);

    const spouse = spouseMap.get(id);
    if (spouse && !levels.has(spouse)) {
      queue.push({ id: spouse, level });
    }

    for (const child of childrenOf.get(id) || []) {
      if (!levels.has(child)) {
        queue.push({ id: child, level: level + 1 });
      }
    }
  }

  // Assign remaining spouse-only
  for (const p of data.persons) {
    if (!levels.has(p.id)) {
      const spouse = spouseMap.get(p.id);
      if (spouse && levels.has(spouse)) {
        levels.set(p.id, levels.get(spouse)!);
      }
    }
  }

  // Step 2: Build couple units
  const units: CoupleUnit[] = [];
  const personToUnit = new Map<string, string>();
  const used = new Set<string>();

  for (const p of data.persons) {
    if (used.has(p.id)) continue;
    used.add(p.id);

    const level = levels.get(p.id) ?? 0;
    const spouse = spouseMap.get(p.id);
    let primary = p.id;
    let spouseId: string | undefined;

    if (spouse && !used.has(spouse)) {
      used.add(spouse);
      spouseId = spouse;
      if (p.gender === 'female' && personMap.get(spouse)?.gender === 'male') {
        primary = spouse;
        spouseId = p.id;
      }
    }

    const unitId = `unit-${primary}`;
    units.push({ id: unitId, primary, spouse: spouseId, level });
    personToUnit.set(primary, unitId);
    if (spouseId) personToUnit.set(spouseId, unitId);
  }

  // Step 3: Map unit → child units, unit → parent units
  const unitChildUnits = new Map<string, Set<string>>();
  const unitParentUnits = new Map<string, Set<string>>();
  const unitMap = new Map(units.map(u => [u.id, u]));

  for (const unit of units) {
    const childUnitIds = new Set<string>();
    for (const pid of [unit.primary, unit.spouse].filter(Boolean) as string[]) {
      for (const childId of childrenOf.get(pid) || []) {
        const cuid = personToUnit.get(childId);
        if (cuid) childUnitIds.add(cuid);
      }
    }
    unitChildUnits.set(unit.id, childUnitIds);
    for (const cuid of childUnitIds) {
      if (!unitParentUnits.has(cuid)) unitParentUnits.set(cuid, new Set());
      unitParentUnits.get(cuid)!.add(unit.id);
    }
  }

  // Step 4: Group units by level
  const maxLevel = Math.max(...levels.values());
  const unitsByLevel = new Map<number, CoupleUnit[]>();
  for (const unit of units) {
    if (!unitsByLevel.has(unit.level)) unitsByLevel.set(unit.level, []);
    unitsByLevel.get(unit.level)!.push(unit);
  }

  // Step 5: Position bottom-up
  const unitX = new Map<string, number>();

  // Start from the bottom level
  let bottomX = 0;
  const bottomUnits = unitsByLevel.get(maxLevel) || [];
  for (const unit of bottomUnits) {
    unitX.set(unit.id, bottomX);
    bottomX += unitWidth(!!unit.spouse) + FAMILY_GAP;
  }

  // Work upward level by level
  for (let level = maxLevel - 1; level >= 0; level--) {
    const levelUnits = unitsByLevel.get(level) || [];

    // Compute desired X for each unit = center over its child units
    const desired = new Map<string, number>();
    for (const unit of levelUnits) {
      const childIds = [...(unitChildUnits.get(unit.id) || [])];
      const childXs: number[] = [];
      for (const cid of childIds) {
        const cx = unitX.get(cid);
        const cu = unitMap.get(cid);
        if (cx !== undefined && cu) {
          childXs.push(cx, cx + unitWidth(!!cu.spouse));
        }
      }
      if (childXs.length > 0) {
        const center = (Math.min(...childXs) + Math.max(...childXs)) / 2;
        desired.set(unit.id, center - unitWidth(!!unit.spouse) / 2);
      }
    }

    // Sort units by which child unit they connect to (using child unit X position)
    const childLevelUnits = unitsByLevel.get(level + 1) || [];
    const childUnitOrder = new Map<string, number>();
    // Sort child units by their X position
    const sortedChildUnits = [...childLevelUnits].sort((a, b) => (unitX.get(a.id) ?? 0) - (unitX.get(b.id) ?? 0));
    sortedChildUnits.forEach((u, i) => childUnitOrder.set(u.id, i));

    levelUnits.sort((a, b) => {
      const aChildren = [...(unitChildUnits.get(a.id) || [])];
      const bChildren = [...(unitChildUnits.get(b.id) || [])];

      // Sort by leftmost connected child unit position
      const aMinChild = aChildren.length > 0
        ? Math.min(...aChildren.map(c => childUnitOrder.get(c) ?? 999))
        : 999;
      const bMinChild = bChildren.length > 0
        ? Math.min(...bChildren.map(c => childUnitOrder.get(c) ?? 999))
        : 999;

      if (aMinChild !== bMinChild) return aMinChild - bMinChild;

      // If same child, sort by desired position
      return (desired.get(a.id) ?? 0) - (desired.get(b.id) ?? 0);
    });

    // Place units: try desired position, prevent overlaps
    let lastRight = -Infinity;
    for (const unit of levelUnits) {
      const d = desired.get(unit.id);
      let x: number;
      if (d !== undefined) {
        x = lastRight === -Infinity ? d : Math.max(d, lastRight + FAMILY_GAP);
      } else {
        x = lastRight === -Infinity ? 0 : lastRight + FAMILY_GAP;
      }
      unitX.set(unit.id, x);
      lastRight = x + unitWidth(!!unit.spouse);
    }
  }

  // Step 6: Top-down refinement - center sibling groups under their parent
  for (let level = 1; level <= maxLevel; level++) {
    const levelUnits = unitsByLevel.get(level) || [];

    // Group siblings by their shared parent unit
    const parentToChildren = new Map<string, CoupleUnit[]>();
    const orphans: CoupleUnit[] = [];
    for (const unit of levelUnits) {
      const parentIds = [...(unitParentUnits.get(unit.id) || [])];
      if (parentIds.length === 0) {
        orphans.push(unit);
        continue;
      }
      // Use primary parent as group key
      const primaryParent = parentIds.sort().join(',');
      if (!parentToChildren.has(primaryParent)) parentToChildren.set(primaryParent, []);
      parentToChildren.get(primaryParent)!.push(unit);
    }

    // For each sibling group, compute shift to center group under parent
    for (const [parentKey, siblings] of parentToChildren) {
      const parentIds = parentKey.split(',');

      // Find parent center
      let parentMinX = Infinity;
      let parentMaxX = -Infinity;
      for (const pid of parentIds) {
        const px = unitX.get(pid);
        const pu = unitMap.get(pid);
        if (px !== undefined && pu) {
          parentMinX = Math.min(parentMinX, px);
          parentMaxX = Math.max(parentMaxX, px + unitWidth(!!pu.spouse));
        }
      }
      if (parentMinX === Infinity) continue;
      const parentCenter = (parentMinX + parentMaxX) / 2;

      // Find current sibling group span
      let groupMinX = Infinity;
      let groupMaxX = -Infinity;
      for (const sib of siblings) {
        const sx = unitX.get(sib.id) ?? 0;
        groupMinX = Math.min(groupMinX, sx);
        groupMaxX = Math.max(groupMaxX, sx + unitWidth(!!sib.spouse));
      }
      const groupCenter = (groupMinX + groupMaxX) / 2;
      const shift = parentCenter - groupCenter;

      if (Math.abs(shift) < 1) continue;

      // Check if shift would cause overlap with non-sibling neighbors
      const siblingIds = new Set(siblings.map(s => s.id));
      let allowedShift = shift;

      if (shift > 0) {
        // Shifting right - check right neighbor
        const rightmostSib = siblings[siblings.length - 1];
        const rightIdx = levelUnits.indexOf(rightmostSib);
        for (let i = rightIdx + 1; i < levelUnits.length; i++) {
          if (siblingIds.has(levelUnits[i].id)) continue;
          const neighborX = unitX.get(levelUnits[i].id) ?? 0;
          const rightEdge = (unitX.get(rightmostSib.id) ?? 0) + unitWidth(!!rightmostSib.spouse) + FAMILY_GAP;
          const maxShift = neighborX - rightEdge;
          allowedShift = Math.min(allowedShift, Math.max(0, maxShift));
          break;
        }
      } else {
        // Shifting left - check left neighbor
        const leftmostSib = siblings[0];
        const leftIdx = levelUnits.indexOf(leftmostSib);
        for (let i = leftIdx - 1; i >= 0; i--) {
          if (siblingIds.has(levelUnits[i].id)) continue;
          const neighbor = levelUnits[i];
          const neighborRight = (unitX.get(neighbor.id) ?? 0) + unitWidth(!!neighbor.spouse) + FAMILY_GAP;
          const leftEdge = unitX.get(leftmostSib.id) ?? 0;
          const maxShift = neighborRight - leftEdge;
          allowedShift = Math.max(allowedShift, Math.min(0, maxShift));
          break;
        }
      }

      // Apply shift to all siblings in the group
      for (const sib of siblings) {
        const current = unitX.get(sib.id) ?? 0;
        unitX.set(sib.id, current + allowedShift);
      }
    }
  }

  // Step 7: Center everything around 0
  const allXValues: number[] = [];
  for (const unit of units) {
    const ux = unitX.get(unit.id) ?? 0;
    allXValues.push(ux, ux + unitWidth(!!unit.spouse));
  }
  const centerOffset = (Math.min(...allXValues) + Math.max(...allXValues)) / 2;

  // Step 8: Build React Flow nodes
  const nodes: Node[] = [];
  for (const unit of units) {
    const ux = (unitX.get(unit.id) ?? 0) - centerOffset;
    const y = unit.level * LEVEL_HEIGHT;

    const primaryPerson = personMap.get(unit.primary);
    if (primaryPerson) {
      nodes.push({
        id: unit.primary,
        type: 'person',
        position: { x: ux, y },
        data: { person: primaryPerson, onSelect },
      });
    }

    if (unit.spouse) {
      const spousePerson = personMap.get(unit.spouse);
      if (spousePerson) {
        nodes.push({
          id: unit.spouse,
          type: 'person',
          position: { x: ux + NODE_WIDTH + SPOUSE_GAP, y },
          data: { person: spousePerson, onSelect },
        });
      }
    }
  }

  // Step 9: Build edges
  const edges: Edge[] = [];
  const addedSpouse = new Set<string>();

  for (const rel of data.relationships) {
    if (rel.type === 'parent') {
      edges.push({
        id: `e-${rel.from}-${rel.to}`,
        source: rel.from,
        target: rel.to,
        type: 'smoothstep',
        style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
      });
    } else if (rel.type === 'spouse') {
      const key = [rel.from, rel.to].sort().join('-');
      if (!addedSpouse.has(key)) {
        addedSpouse.add(key);
        edges.push({
          id: `e-spouse-${key}`,
          source: rel.from,
          target: rel.to,
          type: 'straight',
          style: {
            stroke: '#e91e63',
            strokeWidth: 2,
            strokeDasharray: '6,4',
          },
        });
      }
    }
  }

  return { nodes, edges };
}
