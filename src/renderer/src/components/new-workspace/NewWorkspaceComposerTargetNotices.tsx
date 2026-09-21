import React from 'react'
import { LoaderCircle, PlugZap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { translate } from '@/i18n/i18n'
import type { NewWorkspaceComposerCardProps } from './new-workspace-composer-card-props'
import { EMPTY_PROJECT_OPTIONS } from './new-workspace-composer-card-props'

type NewWorkspaceComposerTargetNoticesProps = Pick<
  NewWorkspaceComposerCardProps,
  | 'projectOptions'
  | 'projectError'
  | 'emptyProjectMessage'
  | 'ephemeralVmRecipeError'
  | 'selectedRepoConnectionId'
  | 'selectedRepoRequiresConnection'
  | 'selectedRepoConnectInProgress'
  | 'onConnectSelectedRepo'
> & {
  projectDescriptionId: string
  sshStatusLabel: string
  connectButtonLabel: string
  selectedProjectName: string
}

/** Messages about the chosen project or host; they sit under the prompt box, not inside it. */
export function NewWorkspaceComposerTargetNotices({
  projectOptions = EMPTY_PROJECT_OPTIONS,
  projectError,
  emptyProjectMessage,
  ephemeralVmRecipeError,
  projectDescriptionId,
  selectedRepoRequiresConnection,
  selectedRepoConnectionId,
  selectedRepoConnectInProgress,
  onConnectSelectedRepo,
  sshStatusLabel,
  connectButtonLabel,
  selectedProjectName
}: NewWorkspaceComposerTargetNoticesProps): React.JSX.Element | null {
  const projectNotice = projectError ? (
    <p id={projectDescriptionId} className="text-[11px] text-destructive">
      {projectError}
    </p>
  ) : projectOptions.length === 0 ? (
    <p id={projectDescriptionId} className="text-[11px] text-muted-foreground">
      {emptyProjectMessage ??
        translate(
          'auto.components.NewWorkspaceComposerCard.addProjectBeforeWorkspace',
          'Add a project before creating a workspace.'
        )}
    </p>
  ) : null
  const connectNotice =
    selectedRepoRequiresConnection && selectedRepoConnectionId ? (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-between gap-3 rounded-md border border-border/70 bg-muted/35 px-3 py-2"
      >
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-foreground">
            {translate('auto.components.NewWorkspaceComposerCard.b5a0796911', 'Connect')}{' '}
            {selectedProjectName}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">{sshStatusLabel}</div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={() => void onConnectSelectedRepo()}
          disabled={selectedRepoConnectInProgress}
          className="shrink-0"
        >
          {selectedRepoConnectInProgress ? (
            <LoaderCircle className="size-3.5 animate-spin" />
          ) : (
            <PlugZap className="size-3.5" />
          )}
          {selectedRepoConnectInProgress
            ? translate('auto.components.NewWorkspaceComposerCard.f660aa1454', 'Connecting')
            : connectButtonLabel}
        </Button>
      </div>
    ) : null
  if (!projectNotice && !ephemeralVmRecipeError && !connectNotice) {
    return null
  }
  return (
    <div className="space-y-2">
      {projectNotice}
      {ephemeralVmRecipeError ? (
        <p className="whitespace-pre-line text-[11px] text-destructive">{ephemeralVmRecipeError}</p>
      ) : null}
      {connectNotice}
    </div>
  )
}
