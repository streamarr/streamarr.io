import type { HeroFragment } from '../graphql/generated/graphql'
import { CmsLink } from './CmsLink'

export function Hero({ block }: { block: HeroFragment }) {
  return (
    <section data-block="hero">
      <h1>{block.heading}</h1>
      {block.lede && <p>{block.lede}</p>}
      {block.actions?.map(
        (action) =>
          action.href &&
          action.label && (
            <CmsLink key={action.href} href={action.href}>
              {action.label}
            </CmsLink>
          ),
      )}
    </section>
  )
}
