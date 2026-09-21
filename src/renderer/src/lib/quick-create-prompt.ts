import {
  resolveQuickCreateLinkedWorkItemPrompt,
  type QuickCreateLinkedWorkItemReference
} from '@/lib/linked-work-item-context'

export type QuickCreatePromptInput = {
  typedPrompt: string
  linkedWorkItem: QuickCreateLinkedWorkItemReference
  note: string
}

export type QuickCreatePrompt = { prompt: string; draftPrompt: string | null }

export function resolveQuickCreatePrompt({
  typedPrompt,
  linkedWorkItem,
  note
}: QuickCreatePromptInput): QuickCreatePrompt {
  const linked = resolveQuickCreateLinkedWorkItemPrompt(linkedWorkItem, note)
  const trimmedPrompt = typedPrompt.trim()
  if (!trimmedPrompt) {
    return linked
  }
  // Why: a typed prompt is an instruction, so it auto-submits; linked-item context rides along in the same message.
  return {
    prompt: [trimmedPrompt, linked.draftPrompt].filter(Boolean).join('\n\n'),
    draftPrompt: null
  }
}
