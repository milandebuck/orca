import type { TopLevelView } from '../../../shared/ui-chrome-types'

type WorkspaceComposerPaneSurfaceInput = {
  activeView: TopLevelView
  activeModal: string
  promptFirstComposer: boolean
}

/** The prompt-first composer takes over the center pane instead of opening a dialog. */
export function shouldShowWorkspaceComposerPane({
  activeView,
  activeModal,
  promptFirstComposer
}: WorkspaceComposerPaneSurfaceInput): boolean {
  return (
    promptFirstComposer && activeView === 'terminal' && activeModal === 'new-workspace-composer'
  )
}
