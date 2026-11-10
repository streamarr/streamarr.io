import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderInRouter } from '../test/renderInRouter'
import { CmsLink } from './CmsLink'

describe('CmsLink', () => {
  it('shouldNavigateThroughTheRouterWhenTheAddressIsASitePath', async () => {
    const { router } = renderInRouter(<CmsLink href="/docs">Read the docs</CmsLink>)

    await userEvent.click(await screen.findByRole('link', { name: 'Read the docs' }))

    await waitFor(() => expect(router.state.location.pathname).toBe('/docs'))
  })

  it('shouldLinkStraightToTheAddressWhenItIsAnotherSite', async () => {
    renderInRouter(<CmsLink href="https://github.com/streamarr">GitHub</CmsLink>)

    expect(await screen.findByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/streamarr',
    )
  })

  it('shouldLinkStraightToTheAddressWhenItIsProtocolRelative', async () => {
    renderInRouter(<CmsLink href="//example.com/docs">Elsewhere</CmsLink>)

    expect(await screen.findByRole('link', { name: 'Elsewhere' })).toHaveAttribute(
      'href',
      '//example.com/docs',
    )
  })
})
