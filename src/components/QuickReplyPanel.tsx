import { useMemo, useState } from 'react'
import { RiCloseLine, RiSearchLine } from '@remixicon/react'
import { Button } from '@/components/base/buttons/button'
import { Chip } from '@/components/base/badges/chip'
import { Input } from '@/components/base/input/input'
import { cx } from '@/utils/cx'
import {
  QUICK_REPLIES,
  QUICK_REPLY_CATEGORIES,
  type QuickReply,
  type QuickReplyCategory,
} from '../data'

interface QuickReplyPanelProps {
  chosenId: string | null
  onChoose: (reply: QuickReply) => void
  onClose: () => void
}

const CATEGORY_CHIP_COLOR: Record<
  QuickReply['category'],
  'blue' | 'lime' | 'yellow' | 'purple'
> = {
  Greetings: 'blue',
  Delivery: 'lime',
  Payment: 'yellow',
  Closing: 'purple',
}

/**
 * Quick Reply panel — workflow states from the Figma section:
 * entry → panel open (search / filter) → reply chosen (inserted into the
 * composer). Rendered as an overlay panel on the chat, BoardUI surface:
 * 16px radius, soft dropdown shadow, 150ms scale + blur entrance.
 */
export function QuickReplyPanel({
  chosenId,
  onChoose,
  onClose,
}: QuickReplyPanelProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<QuickReplyCategory>('All')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return QUICK_REPLIES.filter((reply) => {
      if (category !== 'All' && reply.category !== category) return false
      if (!q) return true
      return (
        reply.title.toLowerCase().includes(q) ||
        reply.text.toLowerCase().includes(q)
      )
    })
  }, [query, category])

  return (
    <section
      aria-label="Quick Reply panel"
      className="qr-panel-enter absolute end-4 top-4 bottom-4 z-20 flex w-96 max-w-[calc(100%-2rem)] flex-col overflow-hidden rounded-2xl border border-border-button-default bg-background-primary-default shadow-dropdown"
    >
      <header className="flex items-start justify-between gap-3 p-4 pb-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-headline-medium text-text-primary">
            Quick Reply
          </h2>
          <p className="text-body-regular text-text-secondary">
            Choose a reply to insert it into the composer.
          </p>
        </div>
        <Button
          variant="ghost"
          size="small"
          iconOnly
          leadingIcon={RiCloseLine}
          aria-label="Close Quick Reply panel"
          onClick={onClose}
        />
      </header>

      <div className="flex flex-col gap-3 px-4 pb-3">
        <Input
          aria-label="Search quick replies"
          placeholder="Search quick replies"
          leadingIcon={RiSearchLine}
          value={query}
          onChange={setQuery}
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {QUICK_REPLY_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="xs"
              variant={category === cat ? 'primary' : 'secondary'}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
        {visible.map((reply) => {
          const isChosen = reply.id === chosenId
          return (
            <button
              key={reply.id}
              type="button"
              onClick={() => onChoose(reply)}
              aria-pressed={isChosen}
              className={cx(
                'flex w-full flex-col gap-1.5 rounded-2xl border p-3 text-start transition-all outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring',
                isChosen
                  ? 'border-accent-500 bg-accent-50 shadow-card'
                  : 'border-border-button-default bg-background-primary-default hover:bg-background-secondary-default',
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-body-medium text-text-primary">
                  {reply.title}
                </span>
                <Chip variant="caption" color={CATEGORY_CHIP_COLOR[reply.category]}>
                  {reply.category}
                </Chip>
              </span>
              <span className="text-body-regular text-text-secondary">
                {reply.text}
              </span>
              {isChosen && (
                <span className="text-caption-1-semibold text-accent-600">
                  Inserted into the composer — review and press Send
                </span>
              )}
            </button>
          )
        })}
        {visible.length === 0 && (
          <p className="px-2 py-8 text-center text-body-regular text-text-tertiary">
            No quick replies match your filter.
          </p>
        )}
      </div>
    </section>
  )
}
