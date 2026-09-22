import { useEffect, useState } from 'react'

type ComposerPaneHandoffInput = {
  composerOpen: boolean
  paneActive: boolean
  closeComposer: () => void
}

/**
 * Whether the dialog host must stay empty because the center pane just stopped hosting an
 * open composer. Why: the pane unmounts in the same commit that changes the view, so it can't
 * observe the change itself; without this the dialog would remount with an empty prompt.
 */
export function useComposerPaneHandoff({
  composerOpen,
  paneActive,
  closeComposer
}: ComposerPaneHandoffInput): boolean {
  // Why a latch in state: it has to be visible in this render, so the dialog never mounts.
  const [paneHosted, setPaneHosted] = useState(paneActive)
  if (paneActive && !paneHosted) {
    setPaneHosted(true)
  }
  if (!composerOpen && paneHosted) {
    setPaneHosted(false)
  }
  const handingOff = composerOpen && paneHosted && !paneActive
  useEffect(() => {
    if (handingOff) {
      closeComposer()
    }
  }, [handingOff, closeComposer])
  return handingOff
}
