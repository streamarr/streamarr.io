import type { Page } from '../cms/page'
import { CallToAction } from './CallToAction'
import { FeatureGrid } from './FeatureGrid'
import { Hero } from './Hero'

type Block = NonNullable<Page['layout']>[number]

// One component per member of the CMS's `Page_Layout` union, chosen by `__typename`. A block type
// the site does not know yet renders nothing: the CMS can gain a block before the site handles it.
function renderBlock(block: Block) {
  switch (block.__typename) {
    case 'HeroBlock':
      return <Hero block={block} />
    case 'FeatureGridBlock':
      return <FeatureGrid block={block} />
    case 'CallToActionBlock':
      return <CallToAction block={block} />
    default:
      return null
  }
}

export function Blocks({ layout }: { layout: Page['layout'] }) {
  // Blocks have no stable identity beyond their position in the editor's order.
  return layout?.map((block, position) => <div key={position}>{renderBlock(block)}</div>)
}
