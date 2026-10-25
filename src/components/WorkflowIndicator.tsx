import { RiCheckLine } from '@remixicon/react'
import { cx } from '@/utils/cx'

export type FlowStep = 'entry' | 'panel' | 'chosen' | 'sent'

const STEPS: { id: FlowStep; label: string }[] = [
  { id: 'entry', label: 'Entry' },
  { id: 'panel', label: 'Panel open' },
  { id: 'chosen', label: 'Reply chosen' },
  { id: 'sent', label: 'Sent' },
]

interface WorkflowIndicatorProps {
  step: FlowStep
}

/** Live indicator of the Figma click-flow: entry → panel → chosen → sent. */
export function WorkflowIndicator({ step }: WorkflowIndicatorProps) {
  const activeIndex = STEPS.findIndex((s) => s.id === step)

  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Workflow state: ${STEPS[activeIndex].label}`}
    >
      <span className="me-1 hidden text-caption-1-semibold text-text-tertiary lg:inline">
        WORKFLOW
      </span>
      {STEPS.map((s, index) => {
        const isDone = index < activeIndex
        const isActive = index === activeIndex
        return (
          <span key={s.id} className="flex items-center gap-1.5">
            <span
              className={cx(
                'flex items-center gap-1.5 rounded-full py-1 pe-2.5 ps-1.5',
                isActive
                  ? 'bg-accent-500 text-text-white'
                  : isDone
                    ? 'bg-background-tertiary-default text-text-secondary'
                    : 'bg-background-secondary-default text-text-tertiary',
              )}
            >
              <span
                className={cx(
                  'flex size-4 items-center justify-center rounded-full text-[10px] font-semibold',
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-background-primary-default text-text-secondary',
                )}
              >
                {isDone ? <RiCheckLine className="size-3" /> : index + 1}
              </span>
              <span className="text-caption-1-semibold whitespace-nowrap">
                {s.label}
              </span>
            </span>
            {index < STEPS.length - 1 && (
              <span className="h-px w-3 bg-separator-border" aria-hidden />
            )}
          </span>
        )
      })}
    </div>
  )
}
