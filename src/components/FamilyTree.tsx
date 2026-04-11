import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import PersonNode from './PersonNode';
import PersonModal from './PersonModal';
import ThemeToggle from './ThemeToggle';
import { familyData } from '../data/family';
import { generateLayout } from '../utils/layoutTree';
import type { Person } from '../types';
import korucukLogo from '../assets/korucuk-logo.png';

const nodeTypes = { person: PersonNode };

export default function FamilyTree() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleSelect = useCallback((person: Person) => {
    setSelectedPerson(person);
  }, []);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => generateLayout(familyData, handleSelect),
    [handleSelect]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        className="bg-[var(--color-canvas)]"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--color-border)"
        />
        <Controls
          className="!bg-[var(--color-surface)] !border-[var(--color-border)] !shadow-md [&>button]:!bg-[var(--color-surface)] [&>button]:!border-[var(--color-border)] [&>button]:!fill-[var(--color-on-surface)] [&>button:hover]:!bg-[var(--color-surface-variant)]"
        />
        <MiniMap
          className="!bg-[var(--color-surface)] !border-[var(--color-border)]"
          nodeColor="var(--color-primary)"
          maskColor="var(--color-backdrop)"
          position="bottom-right"
          pannable={false}
          zoomable={false}
        />
      </ReactFlow>

      {/* Logo */}
      <div className="absolute top-4 left-4 z-10">
        <img src={korucukLogo} alt="Korucuk" className="h-12 object-contain rounded-[4px]" />
      </div>

      <ThemeToggle />
      <PersonModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </div>
  );
}
