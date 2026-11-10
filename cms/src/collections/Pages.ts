import type { CollectionConfig } from 'payload'

import { CallToAction } from '../blocks/CallToAction'
import { FeatureGrid } from '../blocks/FeatureGrid'
import { Hero } from '../blocks/Hero'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    // The site is built from published pages without credentials.
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, FeatureGrid, CallToAction],
    },
  ],
}
