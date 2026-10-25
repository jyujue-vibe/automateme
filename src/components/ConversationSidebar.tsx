import { useMemo, useState } from 'react'
import { RiSearchLine } from '@remixicon/react'
import { Avatar } from '@/components/base/avatar/avatar'
import { Badge } from '@/components/base/badges/badge'
import { Input } from '@/components/base/input/input'
import { cx } from '@/utils/cx'
import type { Conversation } from '../data'

interface ConversationSidebarProps {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
}

export function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
}: ConversationSidebarProps) {
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter(
      (c) =>
        c.customer.toLowerCase().includes(q) ||
        c.snippet.toLowerCase().includes(q),
    )
  }, [conversations, query])

  return (
    <aside className="flex w-80 shrink-0 flex-col border-e border-separator-border bg-background-primary-default">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-title-3-semibold text-text-primary">Inbox</h1>
          <Badge color="primary">
            {conversations.reduce((sum, c) => sum + (c.unread ?? 0), 0)} new
          </Badge>
        </div>
        <Input
          aria-label="Search conversations"
          placeholder="Search conversations"
          leadingIcon={RiSearchLine}
          value={query}
          onChange={setQuery}
        />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 pb-4" aria-label="Conversations">
        {visible.map((conversation) => {
          const isActive = conversation.id === activeId
          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => onSelect(conversation.id)}
              className={cx(
                'flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-start transition-colors outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring',
                isActive
                  ? 'bg-background-secondary-default'
                  : 'hover:bg-background-secondary-default',
              )}
            >
              <Avatar
                size="lg"
                color={conversation.avatarColor}
                initials={conversation.initials}
              />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-body-medium text-text-primary">
                    {conversation.customer}
                  </span>
                  <span className="shrink-0 text-caption-1-medium text-text-tertiary">
                    {conversation.time}
                  </span>
                </span>
                <span className="truncate text-body-regular text-text-secondary">
                  {conversation.snippet}
                </span>
                <span className="text-caption-1-medium text-text-tertiary">
                  {conversation.channel}
                </span>
              </span>
              {conversation.unread ? (
                <Badge color="primary" className="mt-1 shrink-0">
                  {conversation.unread}
                </Badge>
              ) : null}
            </button>
          )
        })}
        {visible.length === 0 && (
          <p className="px-3 py-6 text-center text-body-regular text-text-tertiary">
            No conversations match “{query}”.
          </p>
        )}
      </nav>
    </aside>
  )
}
