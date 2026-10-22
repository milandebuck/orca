// @vitest-environment happy-dom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getDefaultSettings } from '../../../../shared/constants'
import { PromptFirstComposerExperimentalSetting } from './PromptFirstComposerExperimentalSetting'

vi.mock('../../store', () => ({
  useAppStore: (selector: (state: { settingsSearchQuery: string }) => unknown) =>
    selector({ settingsSearchQuery: '' })
}))

afterEach(cleanup)

describe('PromptFirstComposerExperimentalSetting', () => {
  it('turns the prompt-first composer on from the toggle', () => {
    const updateSettings = vi.fn()
    render(
      <PromptFirstComposerExperimentalSetting
        settings={getDefaultSettings('/tmp')}
        updateSettings={updateSettings}
      />
    )
    fireEvent.click(screen.getByLabelText('Toggle starting new workspaces from a prompt'))
    expect(updateSettings).toHaveBeenCalledWith({ promptFirstComposer: true })
  })
})
