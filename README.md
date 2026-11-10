<p align="center">

<br />

<img src="https://github.com/streamarr/streamarr-ux/blob/main/branding/assets/streamarr-mark-and-text-concept-d.svg" width="425" alt="Streamarr logo">

<br />
<br />
<br />

<a href="LICENSE">
<img alt="GPL 3.0 License" src="https://img.shields.io/badge/license-GPL--3.0-orange.svg"/>
</a>

<a href="https://github.com/streamarr/streamarr-server/commit/0d33b22cf3dbb7efef179d48c1d9163698a5062e">
<img alt="Streamarr since 2022" src="https://img.shields.io/badge/since-2022-blue"/>
</a>

</p>

# streamarr.io

The marketing site for [Streamarr](https://github.com/streamarr/streamarr-server). Editors assemble each page in a CMS from reorderable blocks, and the site is built from those pages into static files, so the published site runs without the CMS.

**Status: Early development.** The CMS, three placeholder blocks and an unstyled site that prerenders from them. Nothing is deployed.

## Getting Started

Requires Node 24.22.1 or newer and Docker.

```
nvm use
docker compose up -d --wait   # Postgres for the CMS on 127.0.0.1:5442
```

The CMS, in `cms/`:

```
cp .env.example .env   # then set PAYLOAD_SECRET to a long random string
npm install
npm run seed           # placeholder pages
npm run dev            # admin at http://localhost:3000/admin, GraphQL at /api/graphql
npm run test:int       # integration test; needs the database
npm run schema         # regenerate schema.graphql after changing a collection or a block
```

The site, in `site/`:

```
npm install
npm run dev            # http://localhost:3001, reading pages live from the CMS
npm test               # vitest
npm run codegen        # regenerate the typed documents from ../cms/schema.graphql
npm run format         # Prettier; format:check is the CI gate
npm run build          # prerender to dist/client; needs the CMS running
```

## Architecture

| Package | Role |
| --- | --- |
| [`cms/`](cms/) | [Payload](https://payloadcms.com) 4 (beta) on TanStack Start, backed by Postgres. It holds the pages, serves them over GraphQL, and writes its schema to `cms/schema.graphql`. |
| [`site/`](site/) | A TanStack Start app prerendered to static files. Its GraphQL documents are typed from the CMS's committed schema. |

The site reads the CMS only while it builds. Each page's data is saved as a file beside the page, so a visitor's browser never contacts the CMS, and the CMS can be offline without affecting the published site. A build fails when a page links to a site path that does not exist.

### Blocks

A page's layout is a list of blocks that an editor adds and reorders. In GraphQL the layout is a union with one member per block, and the site keeps one fragment and one component for each. To add a block:

1. Define it in `cms/src/blocks/` and list it on the `layout` field in `cms/src/collections/Pages.ts`.
2. Run `npm run schema` in `cms/`.
3. In `site/src/blocks/`, add a `.graphql` fragment on the block's type and a component that takes it. Spread the fragment in `site/src/pages/page.graphql` and add a case to `Blocks.tsx`.
4. Run `npm run codegen` in `site/`.

Blocks share one union, so a field name used by several blocks must have the same type and nullability in each, or queries have to alias it.

## Continuous integration

CI runs on pull requests and on `main`. It checks the site's formatting, types, unit tests and generated documents, checks the CMS's types and committed schema, and then seeds a CMS and prerenders the site from it. The last job, `build`, is the required check; it uses the `require-jobs` action from [streamarr-workflows](https://github.com/streamarr/streamarr-workflows).

## Contributing

Commits are signed and start with `structural:` or `behavioral:`. [AGENTS.md](AGENTS.md) holds this repository's conventions, and the server's [Contributing](https://github.com/streamarr/streamarr-server/blob/main/CONTRIBUTING.adoc) guide covers the development process shared across Streamarr.
