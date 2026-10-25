import { AVATAR_BG, asset } from '../data';

interface AvatarProps {
  img: string;
  size: number;
  /** Show the green online dot at the bottom-right. */
  dot?: boolean;
  ring?: string;
  style?: React.CSSProperties;
}

/** Transparent portrait cutout inside a colored circle, as in the reference. */
export function Avatar({ img, size, dot = false, ring, style }: AvatarProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        flex: 'none',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: AVATAR_BG[img] ?? '#E4E4E7',
          boxShadow: ring ? `0 0 0 2px ${ring}` : undefined,
        }}
      >
        <img
          src={asset(`${img}.webp`)}
          alt=""
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />
      </div>
      {dot && <span className="mf-online-dot" />}
    </div>
  );
}

/** Overlapping row of small agent avatars with white rings. */
export function AgentStack({ agents, size = 24 }: { agents: string[]; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {agents.map((a, i) => (
        <Avatar
          key={`${a}-${i}`}
          img={a}
          size={size}
          ring="#fff"
          style={{ marginLeft: i === 0 ? 0 : -9, zIndex: agents.length - i }}
        />
      ))}
    </span>
  );
}
