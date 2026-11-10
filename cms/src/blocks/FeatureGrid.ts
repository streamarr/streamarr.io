import type { Block } from 'payload'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  fields: [
    // Blocks share one GraphQL union, so a field name used by several blocks must have the same
    // type and nullability in each, or queries have to alias it.
    { name: 'heading', type: 'text', required: true },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
