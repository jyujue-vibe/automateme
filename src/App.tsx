import { useEffect, useMemo, useRef, useState } from 'react'
import { RiSendPlaneLine } from '@remixicon/react'
import { Avatar } from '@/components/base/avatar/avatar'
import { Button } from '@/components/base/buttons/button'
import { Textarea } from '@/components/base/textarea/textarea'
import { cx } from '@/utils/cx'
import { ChatToolbar } from './components/ChatToolbar'
import { ConversationSidebar } from './components/ConversationSidebar'
import { QuickReplyPanel } from './components/QuickReplyPanel'
import {
  WorkflowIndicator,
  type FlowStep,
} from './components/WorkflowIndicator'
import {
  CONVERSATIONS,
  INITIAL_MESSAGES,
  type ChatMessage,
  type QuickReply,
} from './data'

function nowLabel(): string {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export default function App() {
  const [activeConversationId, setActiveConversationId] = useState(
    CONVERSATIONS[0].id,
  )
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)

  // Quick Reply workflow state: entry → panel → chosen → sent (repeatable)
  const [panelOpen, setPanelOpen] = useState(false)
  const [composerText, setComposerText] = useState('')
  const [chosenReplyId, setChosenReplyId] = useState<string | null>(null)
  const [hasSent, setHasSent] = useState(false)

  const threadEndRef = useRef<HTMLDivElement>(null)

  const activeConversation = useMemo(
    () =>
      CONVERSATIONS.find((c) => c.id === activeConversationId) ??
      CONVERSATIONS[0],
    [activeConversationId],
  )

  const flowStep: FlowStep = panelOpen
    ? chosenReplyId
      ? 'chosen'
      : 'panel'
    : hasSent
      ? 'sent'
      : 'entry'

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const handleToggleQuickReply = () => {
    setPanelOpen((open) => !open)
    setHasSent(false)
  }

  const handleClosePanel = () => {
    setPanelOpen(false)
    setChosenReplyId(null)
  }

  const handleChooseReply = (reply: QuickReply) => {
    setComposerText(reply.text)
    setChosenReplyId(reply.id)
    setHasSent(false)
  }

  const handleComposerChange = (value: string) => {
    setComposerText(value)
    // Manually editing the inserted text drops the "chosen" highlight, so
    // the workflow indicator only claims a reply is chosen while the
    // composer still holds it untouched.
    if (chosenReplyId && value !== composerText) {
      setChosenReplyId(null)
    }
  }

  const handleSend = () => {
    const text = composerText.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      { id: `m-${Date.now()}`, from: 'agent', text, time: nowLabel() },
    ])
    setComposerText('')
    setChosenReplyId(null)
    setPanelOpen(false)
    setHasSent(true)
  }

  return (
    <div className="flex h-full bg-background-full font-sans text-text-primary">
      <ConversationSidebar
        conversations={CONVERSATIONS}
        activeId={activeConversationId}
        onSelect={setActiveConversationId}
      />

      <main className="relative flex min-w-0 flex-1 flex-col bg-background-secondary-default">
        {/* Chat header */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-separator-border bg-background-primary-default px-5 py-3">
          <div className="flex items-center gap-3">
            <Avatar
              size="lg"
              color={activeConversation.avatarColor}
              initials={activeConversation.initials}
            />
            <div className="flex flex-col">
              <span className="text-headline-medium text-text-primary">
                {activeConversation.customer}
              </span>
              <span className="text-caption-1-medium text-text-tertiary">
                {activeConversation.channel} · Order #8412
              </span>
            </div>
          </div>
          <WorkflowIndicator step={flowStep} />
        </header>

        {/* Message thread — the Quick Reply panel overlays THIS area only,
            so the toolbar and composer below stay visible and clickable
            while the panel is open (choose → review in composer → Send). */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-5">
          {messages.map((message, index) => {
            const isAgent = message.from === 'agent'
            const isLatest = index === messages.length - 1
            return (
              <div
                key={message.id}
                className={cx(
                  'flex',
                  isAgent ? 'justify-end' : 'justify-start',
                  isLatest && 'qr-message-enter',
                )}
              >
                <div
                  className={cx(
                    'flex max-w-[70%] flex-col gap-1 rounded-2xl px-4 py-3 shadow-card',
                    isAgent
                      ? 'rounded-br-md bg-accent-500 text-text-white'
                      : 'rounded-bl-md border border-border-button-default bg-background-primary-default text-text-primary',
                  )}
                >
                  <p className="text-body-regular whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <span
                    className={cx(
                      'text-caption-1-medium',
                      isAgent ? 'text-text-white/70' : 'text-text-tertiary',
                    )}
                  >
                    {isAgent ? 'You' : activeConversation.customer} ·{' '}
                    {message.time}
                  </span>
                </div>
              </div>
            )
          })}
            <div ref={threadEndRef} />
          </div>

          {/* Quick Reply overlay panel (thread area only) */}
          {panelOpen && (
            <QuickReplyPanel
              chosenId={chosenReplyId}
              onChoose={handleChooseReply}
              onClose={handleClosePanel}
            />
          )}
        </div>

        {/* Toolbar + composer */}
        <div className="flex flex-col gap-3 border-t border-separator-border bg-background-primary-default px-5 py-4">
          <ChatToolbar
            quickReplyOpen={panelOpen}
            onToggleQuickReply={handleToggleQuickReply}
          />
          <div className="flex items-end gap-2">
            <div className="min-w-0 flex-1">
              <Textarea
                aria-label="Message composer"
                placeholder="Type a message, or insert a quick reply…"
                rows={2}
                value={composerText}
                onChange={handleComposerChange}
              />
            </div>
            <Button
              variant="primary"
              leadingIcon={RiSendPlaneLine}
              onClick={handleSend}
              disabled={!composerText.trim()}
            >
              Send
            </Button>
          </div>
        </div>

      </main>
    </div>
  )
}
