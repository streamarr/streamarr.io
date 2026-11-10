import type { FeatureGridFragment } from '../graphql/generated/graphql'

export function FeatureGrid({ block }: { block: FeatureGridFragment }) {
  return (
    <section data-block="feature-grid">
      <h2>{block.heading}</h2>
      <ul>
        {block.features?.map((feature) => (
          <li key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
