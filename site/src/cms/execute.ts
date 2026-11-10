import type { TypedDocumentString } from '../graphql/generated/graphql'

/** Where a CMS started with `npm run dev` listens. */
export const LOCAL_CMS_URL = 'http://localhost:3000/api/graphql'

type GraphQLResponse<TData> = {
  data?: TData | null
  errors?: ReadonlyArray<{ message: string }>
}

type CmsClientDependencies = {
  fetch: typeof globalThis.fetch
  url: string
}

/**
 * Builds the function that sends generated documents to the CMS. Server-only: it is called from
 * server functions during the build, so the CMS address never reaches the browser.
 */
export function createCmsClient({ fetch, url }: CmsClientDependencies) {
  return async function execute<TData, TVariables>(
    document: TypedDocumentString<TData, TVariables>,
    variables: TVariables,
  ): Promise<TData> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: document.toString(), variables }),
    })

    if (!response.ok) {
      throw new Error(`CMS answered ${response.status} for ${url}`)
    }

    const body = (await response.json()) as GraphQLResponse<TData>
    if (body.errors?.length) {
      throw new Error(`CMS rejected the query: ${body.errors.map((e) => e.message).join('; ')}`)
    }
    if (!body.data) {
      throw new Error('CMS answered without data')
    }

    return body.data
  }
}
