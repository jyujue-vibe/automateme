import { RiEqualizer3Line, RiInstagramLine, RiSearchLine, RiWhatsappLine } from '@remixicon/react';
import { CONVERSATIONS, type Platform } from '../data';
import { AgentStack, Avatar } from './Avatar';
import { MessengerGlyph } from './icons';

function PlatformGlyph({ platform }: { platform: Platform }) {
  if (platform === 'messenger') return <MessengerGlyph size={20} />;
  if (platform === 'instagram')
    return <RiInstagramLine size={21} color="#A0A0AB" style={{ flex: 'none' }} />;
  return <RiWhatsappLine size={21} color="#A0A0AB" style={{ flex: 'none' }} />;
}

interface InboxProps {
  selected: string;
  onSelect: (id: string) => void;
}

/** Column 2 — conversation list under the "Inbox" title. */
export function Inbox({ selected, onSelect }: InboxProps) {
  return (
    <section className="mf-inbox">
      <div className="mf-search-row">
        <label className="mf-search">
          <RiSearchLine size={22} color="#A0A0AB" />
          <input type="text" placeholder="Search" aria-label="Search conversations" />
        </label>
        <button type="button" className="mf-tune-btn" title="Filter" aria-label="Filter">
          <RiEqualizer3Line size={22} />
        </button>
      </div>

      <div className="mf-conv-list">
        {CONVERSATIONS.map((c) => (
          <article
            key={c.id}
            className={`mf-conv${selected === c.id ? ' is-selected' : ''}`}
            onClick={() => onSelect(c.id)}
            data-conv={c.id}
          >
            <Avatar img={c.img} size={48} />
            <div className="mf-conv-main">
              <div className="mf-conv-toprow">
                <span className="mf-conv-name">
                  {c.name}
                  <PlatformGlyph platform={c.platform} />
                </span>
                <span className="mf-conv-side">
                  <span className="mf-conv-time">{c.time}</span>
                  {c.unread ? <span className="mf-unread">{c.unread}</span> : null}
                </span>
              </div>
              <p className="mf-conv-preview">{c.preview}</p>
              {c.agents.length > 0 && (
                <div className="mf-conv-agents">
                  <span>Agents</span>
                  <AgentStack agents={c.agents} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
