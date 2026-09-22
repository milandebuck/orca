// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useComposerPaneHandoff } from './use-composer-pane-handoff'

let root: Root | null = null
let lastHandingOff: boolean | null = null

function Probe(props: { composerOpen: boolean; paneActive: boolean; closeComposer: () => void }) {
  lastHandingOff = useComposerPaneHandoff(props)
  return null
}

function render(props: { composerOpen: boolean; paneActive: boolean; closeComposer: () => void }) {
  if (!root) {
    root = createRoot(document.createElement('div'))
  }
  act(() => {
    root?.render(<Probe {...props} />)
  })
}

describe('useComposerPaneHandoff', () => {
  afterEach(() => {
    act(() => {
      root?.unmount()
    })
    root = null
    lastHandingOff = null
  })

  it('closes the composer when the pane stops hosting it while it is still open', () => {
    const closeComposer = vi.fn()
    render({ composerOpen: true, paneActive: true, closeComposer })
    render({ composerOpen: true, paneActive: false, closeComposer })
    expect(lastHandingOff).toBe(true)
    expect(closeComposer).toHaveBeenCalledTimes(1)
  })

  it('lets the dialog open when the composer never went through the pane', () => {
    const closeComposer = vi.fn()
    render({ composerOpen: true, paneActive: false, closeComposer })
    expect(lastHandingOff).toBe(false)
    expect(closeComposer).not.toHaveBeenCalled()
  })

  it('forgets the pane once the composer closes so a later dialog open works', () => {
    const closeComposer = vi.fn()
    render({ composerOpen: true, paneActive: true, closeComposer })
    render({ composerOpen: false, paneActive: false, closeComposer })
    render({ composerOpen: true, paneActive: false, closeComposer })
    expect(lastHandingOff).toBe(false)
    expect(closeComposer).not.toHaveBeenCalled()
  })
})
