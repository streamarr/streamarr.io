import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions'

import { PageBySlugDocument } from '../graphql/generated/graphql'
import type { PageBySlugQuery } from '../graphql/generated/graphql'
import { createCmsClient, LOCAL_CMS_URL } from './execute'

export type Page = NonNullable<PageBySlugQuery['Pages']>['docs'][number]

/**
 * Reads one page from the CMS. The static middleware runs this during prerendering and saves the
 * answer as a JSON file beside the page, so a visitor's browser reads that file and never calls
 * the CMS. It must stay the last middleware.
 */
export const fetchPage = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .middleware([staticFunctionMiddleware])
  .handler(async ({ data: slug }): Promise<Page | null> => {
    // Read inside the handler: module scope is also bundled for the browser.
    const execute = createCmsClient({
      fetch,
      url: process.env.CMS_GRAPHQL_URL ?? LOCAL_CMS_URL,
    })
    const result = await execute(PageBySlugDocument, { slug })

    return result.Pages?.docs[0] ?? null
  })
