import type { Capability } from '../../content/types';

/* Line drawings for the three capability areas, drawn like drafting
   symbols: hairline strokes in ink, one signal element in accent. */
export function CapabilityGlyph({ kind }: { kind: Capability['glyph'] }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-14 w-14 text-ink-3"
    >
      {kind === 'ai' && (
        <>
          <path d="M11 13h42a5 5 0 0 1 5 5v21a5 5 0 0 1-5 5H29l-10 8v-8h-8a5 5 0 0 1-5-5V18a5 5 0 0 1 5-5Z" />
          <path d="M20 33 31 24l12 10" />
          <circle cx={20} cy={33} r={2.6} />
          <circle cx={43} cy={34} r={2.6} />
          <circle cx={31} cy={24} r={3.2} className="text-accent" stroke="currentColor" />
        </>
      )}
      {kind === 'enterprise' && (
        <>
          <rect x={7} y={9} width={34} height={11} rx={1.5} />
          <rect x={7} y={27} width={34} height={11} rx={1.5} />
          <rect x={7} y={45} width={34} height={11} rx={1.5} />
          <path d="M41 14.5h9v36h-9M41 32.5h9" />
          <circle cx={50} cy={32.5} r={3} className="text-accent" stroke="currentColor" />
          <path d="M13 14.5h6M13 32.5h10M13 50.5h4" />
        </>
      )}
      {kind === 'strategy' && (
        <>
          <path d="M52 32a20 20 0 1 1-6-14.3" />
          <path d="M47.5 10.5 46 17.7l-7.2-1.4" />
          <path d="M22 42V36M29 42V31M36 42V27" />
          <path d="M42 42V22" className="text-accent" stroke="currentColor" />
          <path d="M18 42h28" />
        </>
      )}
    </svg>
  );
}
