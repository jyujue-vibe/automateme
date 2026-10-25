import { Fragment } from 'react';
import { RiDraftLine, RiIdCardLine, RiPriceTag3Line } from '@remixicon/react';
import { CHIP_ORDER, REPLIES, asset, type ReplyCategory } from '../data';
import {
  DoubleChevron,
  FolderSparkleIcon,
  PersonRefreshIcon,
  SparkleBoltIcon,
  SwapNodesIcon,
} from './icons';

interface QuickReplyPanelProps {
  open: boolean;
  onToggle: () => void;
  activeChip: ReplyCategory | null;
  onChip: (chip: ReplyCategory | null) => void;
  onInsert: (text: string) => void;
}

/** Render reply text with 👋 replaced by the wave image, as in the reference. */
function ReplyText({ text }: { text: string }) {
  const parts = text.split('👋');
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <img src={asset('wave.png')} alt="👋" className="mf-wave" draggable={false} />
          )}
          {part}
        </Fragment>
      ))}
    </>
  );
}

const RAIL_BUTTONS = [
  { id: 'automate', label: 'Automate actions', icon: <SwapNodesIcon /> },
  { id: 'notes', label: 'Notes', icon: <RiDraftLine size={26} /> },
  { id: 'followup', label: 'Follow up', icon: <RiPriceTag3Line size={26} /> },
  { id: 'customer', label: 'Saved customer data', icon: <PersonRefreshIcon /> },
  { id: 'case', label: 'Case board', icon: <RiIdCardLine size={26} /> },
];

/** Columns 4+5 — Quick Reply panel and its action rail, as ONE card. */
export function QuickReplyPanel({
  open,
  onToggle,
  activeChip,
  onChip,
  onInsert,
}: QuickReplyPanelProps) {
  const visible = REPLIES.filter((r) => !activeChip || r.cat === activeChip);

  return (
    <section className={`mf-sidecard${open ? '' : ' is-collapsed'}`}>
      {open && (
        <div className="mf-panel">
          <div className="mf-panel-header">
            <h2>Quick Reply</h2>
          </div>
          <div className="mf-chips">
            {CHIP_ORDER.map((chip) => (
              <button
                key={chip}
                type="button"
                data-chip={chip}
                className={`mf-chip${activeChip === chip ? ' is-active' : ''}`}
                onClick={() => onChip(activeChip === chip ? null : chip)}
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="mf-replies">
            {visible.map((r) =>
              r.kind === 'text' ? (
                <div
                  key={r.id}
                  className="mf-reply-card"
                  data-reply={r.id}
                  onClick={() => onInsert(r.insert)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onInsert(r.insert);
                    }
                  }}
                >
                  <ReplyText text={r.text} />
                </div>
              ) : (
                <div key={r.id} className="mf-package-card" data-reply={r.id}>
                  <img
                    src={asset('checkup.jpg')}
                    alt={r.title}
                    className="mf-package-img"
                    draggable={false}
                  />
                  <div className="mf-package-title">{r.title}</div>
                  <div className="mf-package-sub">{r.sub}</div>
                  <button
                    type="button"
                    className="mf-view-detail"
                    onClick={() => onInsert(r.insert)}
                  >
                    View Detail
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      <div className="mf-action-rail">
        <button
          type="button"
          className="mf-collapse-btn"
          onClick={onToggle}
          title={open ? 'Collapse panel' : 'Expand panel'}
          aria-label={open ? 'Collapse panel' : 'Expand panel'}
        >
          <DoubleChevron dir={open ? 'right' : 'left'} />
        </button>
        <div className="mf-action-btns">
          <button
            type="button"
            className="mf-action-btn is-active"
            onClick={onToggle}
            title="Quick Reply"
            aria-label="Quick Reply"
            data-action="quick-reply"
          >
            <SparkleBoltIcon />
          </button>
          {RAIL_BUTTONS.map((b) => (
            <button
              key={b.id}
              type="button"
              className="mf-action-btn"
              title={b.label}
              aria-label={b.label}
            >
              {b.icon}
            </button>
          ))}
          <button
            type="button"
            className="mf-action-btn mf-action-btn-teal"
            title="Case folder"
            aria-label="Case folder"
          >
            <FolderSparkleIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
