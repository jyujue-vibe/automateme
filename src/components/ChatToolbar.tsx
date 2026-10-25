import {
  RiBriefcaseLine,
  RiCalendarTodoLine,
  RiDatabase2Line,
  RiFlashlightLine,
  RiRobot2Line,
  RiStickyNoteLine,
} from '@remixicon/react'
import { Button } from '@/components/base/buttons/button'

interface ChatToolbarProps {
  quickReplyOpen: boolean
  onToggleQuickReply: () => void
}

const PLACEHOLDER_ACTIONS = [
  { label: 'Notes', icon: RiStickyNoteLine },
  { label: 'Follow Up', icon: RiCalendarTodoLine },
  { label: 'Saved Data', icon: RiDatabase2Line },
  { label: 'AI Companion', icon: RiRobot2Line },
  { label: 'Case Board', icon: RiBriefcaseLine },
]

/**
 * The chat action toolbar from the Figma section ("Toolbar" row).
 * Only Quick Reply is functional in this sample — the other panels are
 * visible placeholders for later rounds.
 */
export function ChatToolbar({
  quickReplyOpen,
  onToggleQuickReply,
}: ChatToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="me-1 text-caption-1-semibold text-text-tertiary">
        TOOLBAR
      </span>
      <Button
        variant={quickReplyOpen ? 'primary' : 'secondary'}
        size="small"
        leadingIcon={RiFlashlightLine}
        onClick={onToggleQuickReply}
        aria-expanded={quickReplyOpen}
      >
        Quick Reply
      </Button>
      {PLACEHOLDER_ACTIONS.map((action) => (
        <Button
          key={action.label}
          variant="ghost"
          size="small"
          leadingIcon={action.icon}
          disabled
          title="Placeholder — only the Quick Reply panel is built in this sample"
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}
