import { Blocks } from '../blocks/Blocks'
import type { Page } from '../cms/page'

export function PageView({ page }: { page: Page }) {
  return (
    <main>
      <Blocks layout={page.layout} />
    </main>
  )
}
