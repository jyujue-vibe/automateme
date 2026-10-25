import { useCallback, useRef, useState } from 'react';
import { RiNotification3Line } from '@remixicon/react';
import { INITIAL_MESSAGES, type ChatMessage, type ReplyCategory } from './data';
import { ChatCard } from './components/ChatCard';
import { IconRail } from './components/IconRail';
import { Inbox } from './components/Inbox';
import { QuickReplyPanel } from './components/QuickReplyPanel';

/**
 * METTA FLOW — the real Quick Reply screen, rebuilt from the user's Figma
 * export (1440×810). See ~/workspace/metta-flow-ref/SPEC-quick-reply.md.
 */
export default function App() {
  const [selected, setSelected] = useState('angelina');
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeChip, setActiveChip] = useState<ReplyCategory | null>(null);
  const [composer, setComposer] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);

  const insertIntoComposer = useCallback((text: string) => {
    setComposer(text);
    requestAnimationFrame(() => composerRef.current?.focus());
  }, []);

  const send = useCallback(() => {
    const text = composer;
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: 'agent', text, fresh: true }]);
    setComposer('');
  }, [composer]);

  return (
    <div className="mf-page">
      <IconRail />

      <div className="mf-main">
        <div className="mf-toprow">
          <div className="mf-toprow-title">
            <h1>Inbox</h1>
          </div>
          <div className="mf-toprow-right">
            <span className="mf-help" title="Help">
              ?
            </span>
            <span className="mf-bell" title="Notifications">
              <RiNotification3Line size={29} />
            </span>
            <button type="button" className="mf-upgrade">
              Upgrade
            </button>
          </div>
        </div>

        <div className="mf-bodyrow">
          <Inbox selected={selected} onSelect={setSelected} />
          <ChatCard
            messages={messages}
            composer={composer}
            onComposerChange={setComposer}
            onSend={send}
            composerRef={composerRef}
            grow={!panelOpen}
          />
          <QuickReplyPanel
            open={panelOpen}
            onToggle={() => setPanelOpen((v) => !v)}
            activeChip={activeChip}
            onChip={setActiveChip}
            onInsert={insertIntoComposer}
          />
        </div>
      </div>
    </div>
  );
}
