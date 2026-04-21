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
import Confetti from 'react-confetti';

import PersonNode from './PersonNode';
import PersonModal from './PersonModal';
import ThemeToggle from './ThemeToggle';
import { treeProfiles, type TreeProfile } from '../data/index';
import { generateLayout } from '../utils/layoutTree';
import type { Person } from '../types';
import korucukLogo from '../assets/korucuk-logo.png';

const nodeTypes = { person: PersonNode };

export default function FamilyTree() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(treeProfiles[0].id);

  const activeProfile = treeProfiles.find((p: TreeProfile) => p.id === activeProfileId) ?? treeProfiles[0];

  const handleSelect = useCallback((person: Person) => {
    setSelectedPerson(person);
    if (person.role === 'Yeğen') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
      setTimeout(() => setSelectedPerson(null), 10000);
    }
  }, []);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => generateLayout(activeProfile.data, handleSelect),
    [activeProfile.data, handleSelect]
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
          style={{
            width: window.innerWidth < 640 ? 100 : window.innerWidth < 1024 ? 130 : 150,
            height: window.innerWidth < 640 ? 60 : window.innerWidth < 1024 ? 80 : 100,
          }}
        />
      </ReactFlow>

      {/* Top bar: Logo + Profile Buttons */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-start sm:items-center gap-2 sm:gap-3">
        <img src={korucukLogo} alt="Korucuk" className="h-8 sm:h-10 md:h-12 object-contain rounded-[4px]" />

        {/* Divider */}
        <div className="w-px self-stretch sm:h-7 md:h-8 bg-[var(--color-border)]" />

        {/* Profile buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
          {treeProfiles.map((profile: TreeProfile) => {
            const isActive = profile.id === activeProfileId;
            const isEmpty = profile.data.persons.length === 0;
            return (
              <button
                key={profile.id}
                onClick={() => setActiveProfileId(profile.id)}
                disabled={isEmpty}
                className={`
                  relative
                  px-2.5 py-1 text-xs
                  sm:px-3 sm:py-1.5 sm:text-xs
                  md:px-4 md:py-2 md:text-sm
                  rounded-lg sm:rounded-xl font-medium
                  border transition-all duration-200
                  ${isActive
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-[var(--color-primary)]/20'
                    : isEmpty
                      ? 'bg-[var(--color-surface)] text-[var(--color-on-surface-secondary)] border-[var(--color-border)] opacity-40 cursor-not-allowed'
                      : 'bg-[var(--color-surface)] text-[var(--color-on-surface)] border-[var(--color-border)] hover:bg-[var(--color-surface-variant)] hover:border-[var(--color-primary)] cursor-pointer'
                  }
                `}
              >
                {profile.label}
                {isEmpty && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[var(--color-border)] border border-[var(--color-surface)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={2000}
          gravity={0.4}
          initialVelocityY={50}
          tweenDuration={12000}
        />
      )}
      <ThemeToggle />
      <PersonModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </div>
  );
}
