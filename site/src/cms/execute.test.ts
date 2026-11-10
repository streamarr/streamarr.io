import { describe, expect, it, vi } from 'vitest'

import { TypedDocumentString } from '../graphql/generated/graphql'
import { createCmsClient } from './execute'

const url = 'http://cms.test/api/graphql'
const document = new TypedDocumentString<{ ok: boolean }, { slug: string }>(
  'query Probe($slug: String!) { ok }',
)

function answering(body: unknown, init?: ResponseInit) {
  return vi.fn<typeof fetch>(async () => new Response(JSON.stringify(body), init))
}

describe('createCmsClient', () => {
  it('shouldReturnTheDataWhenTheCmsAnswers', async () => {
    const execute = createCmsClient({ fetch: answering({ data: { ok: true } }), url })

    await expect(execute(document, { slug: 'home' })).resolves.toEqual({ ok: true })
  })

  it('shouldPostTheDocumentAndVariablesToTheCmsWhenExecuting', async () => {
    const fetch = answering({ data: { ok: true } })
    const execute = createCmsClient({ fetch, url })

    await execute(document, { slug: 'home' })

    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: 'query Probe($slug: String!) { ok }',
        variables: { slug: 'home' },
      }),
    })
  })

  it('shouldRejectWithTheStatusWhenTheCmsAnswersWithAnError', async () => {
    const execute = createCmsClient({ fetch: answering({}, { status: 503 }), url })

    await expect(execute(document, { slug: 'home' })).rejects.toThrow(
      'CMS answered 503 for http://cms.test/api/graphql',
    )
  })

  it('shouldRejectWithTheCmsMessagesWhenTheQueryIsRefused', async () => {
    const execute = createCmsClient({
      fetch: answering({ errors: [{ message: 'Unknown field' }, { message: 'Bad variable' }] }),
      url,
    })

    await expect(execute(document, { slug: 'home' })).rejects.toThrow(
      'CMS rejected the query: Unknown field; Bad variable',
    )
  })

  it('shouldRejectWhenTheAnswerCarriesNoData', async () => {
    const execute = createCmsClient({ fetch: answering({ data: null }), url })

    await expect(execute(document, { slug: 'home' })).rejects.toThrow('CMS answered without data')
  })
})
