import { createFileRoute, notFound } from '@tanstack/react-router'

import { fetchPage } from '../cms/page'
import { PageView } from '../pages/PageView'

export const Route = createFileRoute('/$slug')({
  loader: async ({ params }) => {
    const page = await fetchPage({ data: params.slug })
    if (!page) throw notFound()

    return { page }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.page.title} · Streamarr` }] : [],
  }),
  component: SlugRoute,
})

function SlugRoute() {
  const { page } = Route.useLoaderData()

  return <PageView page={page} />
}
