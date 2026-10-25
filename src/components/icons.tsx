// Hand-drawn inline SVG glyphs that Remix doesn't cover (or covers with a
// different shape) — approximated from the reference screen.

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
}

/** Orange heart logo with an inner swirl and a sparkle, top-left of the rail. */
export function LogoIcon({ size = 38 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        d="M24 41C13.5 33.6 6.5 26.8 6.5 18.9 6.5 12.9 10.9 8.5 16.6 8.5c3 0 5.8 1.3 7.4 3.6 1.2-1.7 3.1-2.9 5.3-3.4"
        fill="none"
        stroke="#FF3B00"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M41.5 18.9c0 3.4-1.2 6.6-3.3 9.7"
        fill="none"
        stroke="#FF3B00"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M30.5 21.5c.8 2.9-.9 5.9-3.9 6.7-3.1.9-6.4-.9-7.3-4-.8-2.9.7-5.7 3.3-6.7"
        fill="none"
        stroke="#FF3B00"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M36.5 4.5l1.1 3 3 1.1-3 1.1-1.1 3-1.1-3-3-1.1 3-1.1z"
        fill="#FF3B00"
      />
    </svg>
  );
}

/** Monitor with a pulse line (rail nav 1). */
export function MonitorPulseIcon({ size = 26 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M6.5 10.5h2.7l1.4-2.8 2.2 5 1.5-2.2h3.2" />
      <path d="M12 16.5v3M8.5 20.5h7" />
    </svg>
  );
}

/** Four rounded squares + plus (rail nav 3). */
export function GridPlusIcon({ size = 26 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.8" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8" />
      <path d="M16.8 13.8v5.9M13.8 16.8h5.9" />
    </svg>
  );
}

/** Card with an arrow out of the top-right corner (rail nav 4). */
export function CardArrowIcon({ size = 26 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="2.8" y="6.8" width="13.5" height="12" rx="2" />
      <path d="M13.2 3h6.3v6.3M19.5 3l-6.8 6.8" />
    </svg>
  );
}

/** Note/document with a small clock badge (rail nav 5). */
export function NoteClockIcon({ size = 26 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M7 3.5h7.5L19 8v12a1.6 1.6 0 0 1-1.6 1.6H7A1.6 1.6 0 0 1 5.4 20V5.1A1.6 1.6 0 0 1 7 3.5z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.3 9.5h4M8.3 13h2.5" />
      <circle cx="16.4" cy="16.4" r="4.1" fill="white" strokeWidth="1.6" />
      <path d="M16.4 13.9v2.5l1.7 1.2" strokeWidth="1.5" />
    </svg>
  );
}

/** Facebook Messenger glyph: gray-blue bubble with a white bolt. */
export function MessengerGlyph({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ flex: 'none' }}>
      <path
        fill="#A6A6B3"
        d="M12 2.8C6.4 2.8 2 6.8 2 11.8c0 2.8 1.4 5.3 3.7 7v3l3.4-1.9c.9.3 1.9.4 2.9.4 5.6 0 10-4 10-8.5S17.6 2.8 12 2.8z"
      />
      <path
        fill="#fff"
        d="M6.9 15.7l3.9-5.9 2 2.4 4.3-3.6-3.6 6-2-2.4z"
      />
    </svg>
  );
}

/** Four-point sparkle with the AI teal→blue gradient (AI Assistant bar). */
export function Sparkle4({ size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ flex: 'none' }}>
      <defs>
        <linearGradient id="mf-ai-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15DEBC" />
          <stop offset="100%" stopColor="#009DFF" />
        </linearGradient>
      </defs>
      <path
        fill="url(#mf-ai-grad)"
        d="M12 1.5c.8 6.1 3.4 8.7 9.5 9.5-6.1.8-8.7 3.4-9.5 9.5C11.2 12.9 8.6 10.3 2.5 9.5 8.6 8.7 11.2 6.1 12 1.5z"
        transform="translate(0 1)"
      />
    </svg>
  );
}

/** Lightning bolt + small sparkle (action-rail Quick Reply toggle). */
export function SparkleBoltIcon({ size = 27 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12.6 2.2L5.4 13.4h4.9L9.2 21.8l7.6-11.6h-5z"
      />
      <path
        fill="currentColor"
        d="M18.6 2.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z"
      />
    </svg>
  );
}

/** Two nodes with opposite vertical arrows (action-rail automate). */
export function SwapNodesIcon({ size = 26 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="3.6" y="3.6" width="5.6" height="5.6" rx="1.6" />
      <rect x="14.8" y="14.8" width="5.6" height="5.6" rx="1.6" />
      <path d="M15.4 3.8v6.4M12.8 7.7l2.6 2.6 2.6-2.6" />
      <path d="M8.6 20.2v-6.4M6 16.3l2.6-2.6 2.6 2.6" />
    </svg>
  );
}

/** Person with a small circular-arrow badge (action-rail customer data). */
export function PersonRefreshIcon({ size = 26 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="10.4" cy="7.8" r="3.4" />
      <path d="M3.8 20.2c.7-3.4 3.3-5.3 6.6-5.3 1.2 0 2.3.3 3.2.8" />
      <path d="M20.6 15.2a4.3 4.3 0 1 1-1.2 3.4" />
      <path d="M20.9 12.4v3h-3" />
    </svg>
  );
}

/** Folder with a sparkle (action-rail bottom, teal). */
export function FolderSparkleIcon({ size = 26 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M3 7.2A2.2 2.2 0 0 1 5.2 5h3.6a2 2 0 0 1 1.6.8l1.7 2.1h6.7A2.2 2.2 0 0 1 21 10.1v7.1a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 17.2z" />
      <path
        d="M17.6 2.2l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** Double chevron used by the panel collapse/reopen button. */
export function DoubleChevron({ dir = 'right', size = 20 }: { dir?: 'left' | 'right'; size?: number }) {
  const flip = dir === 'left' ? 'rotate(180 12 12)' : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <g transform={flip}>
        <path d="M5.5 5.5L12 12l-6.5 6.5" />
        <path d="M12.5 5.5L19 12l-6.5 6.5" />
      </g>
    </svg>
  );
}
