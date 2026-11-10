import { getPayload } from 'payload'

import config from './payload.config'

// Development seed: placeholder pages that between them use every block type and link to each
// other. Run with `npm run seed`.
const payload = await getPayload({ config })

const pages = [
  {
    title: 'Home',
    slug: 'home',
    layout: [
      {
        blockType: 'hero' as const,
        heading: 'Your library, on your own server',
        lede: 'Streamarr is an open-source media server that organizes your personal video library and streams it to your devices.',
        actions: [
          { label: 'View on GitHub', href: 'https://github.com/streamarr/streamarr-server' },
          { label: 'Read the docs', href: '/docs' },
        ],
      },
      {
        blockType: 'featureGrid' as const,
        heading: 'Built for the household',
        features: [
          {
            title: 'Profiles and parental controls',
            body: 'Each viewer has a Profile. A Kids Profile can carry a Content Ceiling and a PIN.',
          },
          {
            title: 'Large libraries',
            body: 'The server runs on PostgreSQL, and the clients are built for browsing very large libraries.',
          },
          {
            title: 'Transcoding that scales out',
            body: 'Transcode workers scale horizontally, with hardware transcoding support.',
          },
        ],
      },
      {
        blockType: 'callToAction' as const,
        heading: 'Run it on your own hardware',
        label: 'Read the docs',
        href: '/docs',
      },
    ],
  },
  {
    title: 'Documentation',
    slug: 'docs',
    layout: [
      {
        blockType: 'hero' as const,
        heading: 'Documentation',
        lede: 'Placeholder for the documentation section.',
        actions: [{ label: 'Back to home', href: '/' }],
      },
    ],
  },
]

// A seed has no signed-in user, and Payload 4's local API enforces access control unless told
// otherwise.
const overrideAccess = true

for (const page of pages) {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: page.slug } },
    limit: 1,
    overrideAccess,
  })

  const [current] = existing.docs
  const saved = current
    ? await payload.update({ collection: 'pages', id: current.id, data: page, overrideAccess })
    : await payload.create({ collection: 'pages', data: page, overrideAccess })

  payload.logger.info(`Seeded page "${saved.slug}" (id ${saved.id})`)
}

process.exit(0)
