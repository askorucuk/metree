import type { Node, Edge } from '@xyflow/react';
import type { FamilyTreeData, Person } from '../types';

const NODE_WIDTH = 220;
const SPOUSE_GAP = 30;
const FAMILY_GAP = 60;
const VERTICAL_GAP = 100;

interface FamilyUnit {
  id: string;
  primary: string;
  spouse?: string;
  childUnits: FamilyUnit[];
  width: number;
}

export function generateLayout(
  data: FamilyTreeData,
  onSelect: (person: Person) => void
): { nodes: Node[]; edges: Edge[] } {
  const personMap = new Map(data.persons.map(p => [p.id, p]));
  const parentMap = new Map<string, string[]>();
  const spouseMap = new Map<string, string>();
  const childrenFromParent = new Map<string, Set<string>>();

  for (const rel of data.relationships) {
    if (rel.type === 'parent') {
      if (!childrenFromParent.has(rel.from)) childrenFromParent.set(rel.from, new Set());
      childrenFromParent.get(rel.from)!.add(rel.to);
      if (!parentMap.has(rel.to)) parentMap.set(rel.to, []);
      parentMap.get(rel.to)!.push(rel.from);
    } else if (rel.type === 'spouse') {
      spouseMap.set(rel.from, rel.to);
      spouseMap.set(rel.to, rel.from);
    }
  }

  function getCoupleChildren(a: string, b?: string): string[] {
    const set = new Set<string>();
    for (const c of childrenFromParent.get(a) || []) set.add(c);
    if (b) for (const c of childrenFromParent.get(b) || []) set.add(c);
    return [...set];
  }

  function selfWidth(hasSpouse: boolean): number {
    return hasSpouse ? NODE_WIDTH * 2 + SPOUSE_GAP : NODE_WIDTH;
  }

  const usedInUnit = new Set<string>();

  function buildUnit(personId: string): FamilyUnit | null {
    if (usedInUnit.has(personId)) return null;
    usedInUnit.add(personId);

    const spouse = spouseMap.get(personId);
    let primary = personId;
    let spouseId = spouse;

    if (spouse && !usedInUnit.has(spouse)) {
      usedInUnit.add(spouse);
      const person = personMap.get(personId);
      if (person && person.gender === 'female' && personMap.get(spouse)?.gender === 'male') {
        primary = spouse;
        spouseId = personId;
      }
    } else {
      spouseId = undefined;
    }

    const children = getCoupleChildren(primary, spouseId);
    const childUnits: FamilyUnit[] = [];
    for (const childId of children) {
      const childUnit = buildUnit(childId);
      if (childUnit) childUnits.push(childUnit);
    }

    const sw = selfWidth(!!spouseId);
    const childrenWidth = childUnits.length > 0
      ? childUnits.reduce((sum, u) => sum + u.width, 0) + (childUnits.length - 1) * FAMILY_GAP
      : 0;

    return {
      id: primary,
      primary,
      spouse: spouseId,
      childUnits,
      width: Math.max(sw, childrenWidth),
    };
  }

  // Find roots
  const hasParents = new Set(parentMap.keys());
  const rootUnits: FamilyUnit[] = [];

  for (const p of data.persons) {
    if (!hasParents.has(p.id) && !usedInUnit.has(p.id)) {
      const unit = buildUnit(p.id);
      if (unit) rootUnits.push(unit);
    }
  }

  // Sort root units: deepest (main tree) first, then by connection proximity
  function unitDepth(u: FamilyUnit): number {
    if (u.childUnits.length === 0) return 1;
    return 1 + Math.max(...u.childUnits.map(unitDepth));
  }
  rootUnits.sort((a, b) => unitDepth(b) - unitDepth(a));

  // Position units recursively
  const positions = new Map<string, { x: number; y: number }>();

  function positionUnit(unit: FamilyUnit, x: number, level: number) {
    const y = level * (180 + VERTICAL_GAP);
    const sw = selfWidth(!!unit.spouse);

    const unitX = x + (unit.width - sw) / 2;
    positions.set(unit.primary, { x: unitX, y });
    if (unit.spouse) {
      positions.set(unit.spouse, { x: unitX + NODE_WIDTH + SPOUSE_GAP, y });
    }

    let childX = x;
    for (const child of unit.childUnits) {
      positionUnit(child, childX, level + 1);
      childX += child.width + FAMILY_GAP;
    }
  }

  let startX = 0;
  for (const rootUnit of rootUnits) {
    positionUnit(rootUnit, startX, 0);
    startX += rootUnit.width + FAMILY_GAP * 1.5;
  }

  // Center around 0
  const allPos = [...positions.values()];
  if (allPos.length > 0) {
    const minX = Math.min(...allPos.map(p => p.x));
    const maxX = Math.max(...allPos.map(p => p.x)) + NODE_WIDTH;
    const offset = (minX + maxX) / 2;
    for (const [id, pos] of positions) {
      positions.set(id, { x: pos.x - offset, y: pos.y });
    }
  }

  // Build nodes
  const nodes: Node[] = [];
  for (const [id, pos] of positions) {
    const person = personMap.get(id);
    if (!person) continue;
    nodes.push({
      id,
      type: 'person',
      position: pos,
      data: { person, onSelect },
    });
  }

  // Build edges
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
