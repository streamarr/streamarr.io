import { createFileRoute } from '@tanstack/react-router'

// Payload 4.0.0-beta.7 ships a GraphQL handler for TanStack Start but its template only wires the
// REST catch-all (`api.$.ts`), which answers `/api/graphql` with a 404. This route wires it.
async function graphql({ request }: { request: Request }): Promise<Response> {
  const { handleGraphQL } = await import('@payloadcms/tanstack-start/server')
  const config = await (await import('@payload-config')).default

  return handleGraphQL({ config, request })
}

export const Route = createFileRoute('/_payload/api/graphql')({
  server: {
    handlers: {
      POST: graphql,
    },
  },
})
