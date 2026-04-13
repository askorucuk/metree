import type { Person } from '../types';

interface PersonModalProps {
  person: Person | null;
  onClose: () => void;
}

export default function PersonModal({ person, onClose }: PersonModalProps) {
  if (!person) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-backdrop)]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="h-24 relative"
          style={{
            background: person.gender === 'male'
              ? 'linear-gradient(135deg, #1976d2, #42a5f5)'
              : 'linear-gradient(135deg, #e91e63, #f06292)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm
              flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>
        {/* Avatar */}
        <div className="flex justify-center -mt-10">
          <div
            className="w-20 h-20 rounded-full border-4 border-[var(--color-surface)] flex items-center justify-center text-white text-2xl font-medium"
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
        </div>
        {/* Content */}
        <div className="flex flex-col items-center justify-start gap-2 p-6 pt-4 text-center">
          <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">
            {person.firstName} {person.lastName}
          </h2>

          {person.birthDate && (
            <p className="text-sm text-[var(--color-on-surface-secondary)] mt-1">
              {person.birthDate}{person.deathDate ? ` — ${person.deathDate}` : ' — Hayatta'}
            </p>
          )}

          {person.description && (
            <div className="mt-4 flex flex-col items-start gap-2 w-full bg-[var(--color-surface-variant)] rounded-xl p-4">
              {person.description.split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="text-sm text-[var(--color-on-surface-secondary)] leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
