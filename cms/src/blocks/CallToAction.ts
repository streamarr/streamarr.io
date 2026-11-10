import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'callToAction',
  interfaceName: 'CallToActionBlock',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true },
  ],
}
