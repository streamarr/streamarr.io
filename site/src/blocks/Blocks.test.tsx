import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Page } from '../cms/page'
import { renderInRouter } from '../test/renderInRouter'
import { Blocks } from './Blocks'

type Layout = NonNullable<Page['layout']>

const layout: Layout = [
  {
    __typename: 'HeroBlock',
    heading: 'Your library, on your own server',
    lede: 'An open-source media server.',
    actions: [{ label: 'View on GitHub', href: 'https://github.com/streamarr/streamarr-server' }],
  },
  {
    __typename: 'FeatureGridBlock',
    heading: 'Built for the household',
    features: [
      { title: 'Profiles', body: 'Each viewer has a Profile.' },
      { title: 'Large libraries', body: 'Built for browsing very large libraries.' },
    ],
  },
  {
    __typename: 'CallToActionBlock',
    heading: 'Run it on your own hardware',
    label: 'Read the docs',
    href: '/docs',
  },
]

describe('Blocks', () => {
  it('shouldRenderEveryBlockInTheEditorsOrder', async () => {
    renderInRouter(<Blocks layout={layout} />)

    await screen.findByRole('heading', { name: 'Your library, on your own server' })
    const headings = screen.getAllByRole('heading').map((heading) => heading.textContent)

    expect(headings).toEqual([
      'Your library, on your own server',
      'Built for the household',
      'Profiles',
      'Large libraries',
      'Run it on your own hardware',
    ])
  })

  it('shouldShowEachBlocksOwnFieldsWhenRendered', async () => {
    renderInRouter(<Blocks layout={layout} />)

    expect(await screen.findByText('An open-source media server.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/streamarr/streamarr-server',
    )
    const features = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(features).toHaveLength(2)
    expect(within(features[0]).getByText('Each viewer has a Profile.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read the docs' })).toHaveAttribute('href', '/docs')
  })

  it('shouldRenderNothingForABlockTypeTheSiteDoesNotKnow', async () => {
    // The generated union lists the blocks the schema had when the types were generated; a newer
    // CMS can send one that is not among them.
    const newerBlock = { __typename: 'QuoteBlock', quote: 'Unseen' } as unknown as Layout[number]

    renderInRouter(<Blocks layout={[newerBlock, layout[2]]} />)

    await screen.findByRole('heading', { name: 'Run it on your own hardware' })
    expect(screen.getAllByRole('heading')).toHaveLength(1)
  })
})
