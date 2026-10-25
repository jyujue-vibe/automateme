import { useEffect, useRef } from 'react';
import {
  RiAlignLeft,
  RiArrowUpSLine,
  RiCheckboxCircleLine,
  RiEmotionHappyLine,
  RiFileAddLine,
  RiFileList3Line,
  RiLink,
  RiListUnordered,
  RiMailSettingsLine,
  RiMore2Fill,
  RiUserSharedLine,
} from '@remixicon/react';
import { TIMESTAMP, type ChatMessage } from '../data';
import { Avatar } from './Avatar';
import { Sparkle4 } from './icons';

interface ChatCardProps {
  messages: ChatMessage[];
  composer: string;
  onComposerChange: (value: string) => void;
  onSend: () => void;
  composerRef: React.RefObject<HTMLTextAreaElement | null>;
  grow: boolean;
}

/** Column 3 — the chat card: header, message thread, composer. */
export function ChatCard({
  messages,
  composer,
  onComposerChange,
  onSend,
  composerRef,
  grow,
}: ChatCardProps) {
  const threadRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(messages.length);

  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    // Only follow the thread when a NEW message is appended; on first render
    // the thread must stay at the top so the first message is never clipped.
    if (messages.length > prevCountRef.current) {
      el.scrollTop = el.scrollHeight;
    }
    prevCountRef.current = messages.length;
  }, [messages]);

  const hasText = composer.trim().length > 0;

  return (
    <section className={`mf-chat${grow ? ' is-grow' : ''}`}>
      <header className="mf-chat-header">
        <Avatar img="angelina" size={54} />
        <div className="mf-chat-title">
          <div className="mf-chat-name">Angelina Jolie</div>
          <div className="mf-chat-sub">Messenger | Online</div>
        </div>
        <div className="mf-chat-actions">
          <button type="button" title="Assign" aria-label="Assign">
            <RiUserSharedLine size={23} />
          </button>
          <button type="button" title="Resolve" aria-label="Resolve">
            <RiCheckboxCircleLine size={23} />
          </button>
          <button type="button" title="Details" aria-label="Details">
            <RiFileList3Line size={23} />
          </button>
          <span className="mf-chat-more">
            <RiMore2Fill size={24} />
          </span>
        </div>
      </header>

      <div className="mf-thread" ref={threadRef}>
        {messages.map((m, i) =>
          m.from === 'customer' ? (
            <div key={i} className="mf-msg mf-msg-customer">
              <span className="mf-avatar-cell">
                <Avatar img="angelina" size={42} dot />
              </span>
              <div className="mf-msg-name">Angelina Jolie</div>
              <div className="mf-bubble mf-bubble-customer">{m.text}</div>
              <div className="mf-ts mf-ts-customer">{TIMESTAMP}</div>
            </div>
          ) : (
            <div key={i} className={`mf-msg mf-msg-agent${m.fresh ? ' qr-message-enter' : ''}`}>
              <div className="mf-msg-main mf-msg-main-agent">
                <div className="mf-bubble mf-bubble-agent">{m.text}</div>
                <div className="mf-ts mf-ts-right">{TIMESTAMP}</div>
              </div>
              <Avatar img="agent" size={42} dot />
            </div>
          ),
        )}
      </div>

      <div className="mf-composer">
        <div className="mf-aiwrap">
          <div className="mf-aibar">
            <Sparkle4 />
            <span className="mf-ai-title">AI Assistant</span>
            <span className="mf-ai-actions">
              <button type="button" className="mf-ai-btn">
                Ask Anything
              </button>
              <button type="button" className="mf-ai-btn mf-ai-btn-teal">
                Suggest Me
              </button>
              <RiArrowUpSLine size={22} color="#70707B" />
            </span>
          </div>
        </div>
        <div className="mf-gradline" />
        <textarea
          ref={composerRef}
          className="mf-textarea"
          placeholder="Write a message"
          aria-label="Write a message"
          value={composer}
          rows={3}
          onChange={(e) => onComposerChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <div className="mf-toolbar">
          <span className="mf-tool">
            <RiFileAddLine size={23} />
          </span>
          <span className="mf-tool">
            <RiEmotionHappyLine size={23} />
          </span>
          <span className="mf-tool-div" />
          <span className="mf-tool mf-tool-letter" style={{ fontWeight: 600 }}>
            B
          </span>
          <span className="mf-tool mf-tool-letter mf-tool-under">U</span>
          <span className="mf-tool-div" />
          <span className="mf-tool">
            <RiAlignLeft size={23} />
          </span>
          <span className="mf-tool">
            <RiListUnordered size={23} />
          </span>
          <span className="mf-tool">
            <RiLink size={23} />
          </span>
          <span className="mf-toolbar-right">
            <button type="button" className="mf-mail-btn" title="Email settings" aria-label="Email settings">
              <RiMailSettingsLine size={22} />
            </button>
            <button
              type="button"
              className={`mf-send${hasText ? ' is-active' : ''}`}
              onClick={onSend}
            >
              Send
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}
