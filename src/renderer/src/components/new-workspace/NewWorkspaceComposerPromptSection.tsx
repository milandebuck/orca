import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { translate } from '@/i18n/i18n'
import { isImeOwnedKeyboardEvent } from '@/lib/ime-composition-keyboard-event'
import type { NewWorkspaceComposerCardProps } from './new-workspace-composer-card-props'

type NewWorkspaceComposerPromptSectionProps = Pick<
  NewWorkspaceComposerCardProps,
  'agentPrompt' | 'onAgentPromptChange' | 'quickAgent' | 'createDisabled' | 'onCreate'
>

export function NewWorkspaceComposerPromptSection({
  agentPrompt = '',
  onAgentPromptChange,
  quickAgent,
  createDisabled,
  onCreate
}: NewWorkspaceComposerPromptSectionProps): React.JSX.Element {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key !== 'Enter' || event.metaKey || event.ctrlKey || event.altKey) {
      return
    }
    if (event.shiftKey || isImeOwnedKeyboardEvent(event)) {
      return
    }
    // Why: plain Enter fires the task like the chat composer; Shift+Enter keeps the newline.
    event.preventDefault()
    if (!createDisabled) {
      onCreate()
    }
  }
  const disabled = quickAgent === null
  return (
    <Textarea
      data-workspace-prompt-input="true"
      aria-label={translate('auto.components.NewWorkspaceComposerCard.promptLabel', 'Prompt')}
      value={agentPrompt}
      disabled={disabled}
      onChange={(event) => onAgentPromptChange?.(event.target.value)}
      onKeyDown={handleKeyDown}
      rows={3}
      placeholder={
        disabled
          ? translate(
              'auto.components.NewWorkspaceComposerCard.promptPlaceholderNoAgent',
              'Pick an agent to send it a prompt'
            )
          : translate(
              'auto.components.NewWorkspaceComposerCard.promptPlaceholder',
              'What should the agent do in this worktree?'
            )
      }
      className="max-h-40 min-h-0 resize-none"
    />
  )
}
