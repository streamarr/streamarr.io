import type { CodegenConfig } from '@graphql-codegen/cli'

// The schema is the file the CMS generates and commits (`npm run schema` in ../cms), so types
// never depend on a running CMS. Documents compile to typed strings: the site only ever sends
// them from the build, so it needs no GraphQL runtime in the browser.
const config: CodegenConfig = {
  schema: '../cms/schema.graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        documentMode: 'string',
        strictScalars: true,
        scalars: {
          DateTime: 'string',
          EmailAddress: 'string',
          JSON: 'unknown',
          JSONObject: 'Record<string, unknown>',
        },
        enumsAsTypes: true,
        futureProofEnums: true,
        futureProofUnions: true,
        useTypeImports: true,
      },
    },
  },
}

export default config
