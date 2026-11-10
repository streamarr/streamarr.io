import { createFileRoute, notFound } from '@tanstack/react-router'

import { fetchPage } from '../cms/page'
import { PageView } from '../pages/PageView'

export const Route = createFileRoute('/')({
  loader: async () => {
    const page = await fetchPage({ data: 'home' })
    if (!page) throw notFound()

    return { page }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.page.title} · Streamarr` }] : [],
  }),
  component: HomeRoute,
})

function HomeRoute() {
  const { page } = Route.useLoaderData()

  return <PageView page={page} />
}
