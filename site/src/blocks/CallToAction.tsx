import type { CallToActionFragment } from '../graphql/generated/graphql'
import { CmsLink } from './CmsLink'

export function CallToAction({ block }: { block: CallToActionFragment }) {
  return (
    <section data-block="call-to-action">
      <h2>{block.heading}</h2>
      <CmsLink href={block.href}>{block.label}</CmsLink>
    </section>
  )
}
