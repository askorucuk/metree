import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { Person } from '../types';

type PersonNodeData = {
  person: Person;
  onSelect: (person: Person) => void;
};

function PersonNode({ data }: NodeProps & { data: PersonNodeData }) {
  const { person, onSelect } = data;

  if (person.isPlaceholder) {
    return (
      <>
        <Handle type="target" position={Position.Top} className="!bg-[var(--color-primary)] !w-2 !h-2 !opacity-0" />
        <div
          className="cursor-pointer rounded-2xl w-[220px]
            border-2 border-dashed border-[#64b5f6]
            bg-[#e3f2fd] dark:bg-[#0d2137]
            shadow-sm hover:shadow-md transition-all duration-200
            hover:scale-[1.03]"
          style={{ padding: '20px' }}
        >
          <div className="flex flex-col items-center justify-center gap-2 py-4">
            <span className="text-4xl text-[#64b5f6]">{person.firstName}</span>
            <p className="text-sm font-medium text-[#42a5f5]">
              {person.role || 'Akraba'}
            </p>
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} className="!bg-[var(--color-primary)] !w-2 !h-2 !opacity-0" />
      </>
    );
  }

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-[var(--color-primary)] !w-2 !h-2 !opacity-0" />
      <div
        onClick={() => onSelect(person)}
        className="cursor-pointer rounded-2xl w-[220px]
          bg-[var(--color-surface)] border border-[var(--color-border)]
          shadow-md hover:shadow-xl transition-all duration-200
          hover:scale-[1.03] hover:border-[var(--color-primary)]
          overflow-hidden p-5"
        style={{ padding: '20px' }}
      >
        <div className="flex flex-col items-start justify-start gap-2">
          {/* Tag badge */}
          {person.tag && (
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-3
              bg-[var(--color-tag-bg)] text-[var(--color-tag-text)]">
              {person.tag}
            </span>
          )}

          {/* Name */}
          <h3 className="text-lg font-bold text-[var(--color-on-surface)] leading-tight">
            {person.firstName} {person.lastName}
          </h3>

          {/* Dates */}
          <p className="text-sm text-[var(--color-on-surface-secondary)] mt-1">
            {person.birthDate || '?'} - {person.deathDate || 'Present'}
          </p>

          {/* Avatar + Role */}
          <div className="flex items-center gap-3 mt-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 border-2 border-[var(--color-border)]"
              style={{
                backgroundColor: person.gender === 'male' ? '#1976d2' : '#e91e63',
              }}
            >
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={person.firstName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                person.firstName[0] + person.lastName[0]
              )}
            </div>
            {person.role && (
              <span className="text-sm font-medium text-[var(--color-on-surface-secondary)]">
                {person.role}
              </span>
            )}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-[var(--color-primary)] !w-2 !h-2 !opacity-0" />
    </>
  );
}

export default memo(PersonNode);
