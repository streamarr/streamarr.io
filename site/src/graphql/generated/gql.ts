/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment CallToAction on CallToActionBlock {\n  heading\n  label\n  href\n}": typeof types.CallToActionFragmentDoc,
    "fragment FeatureGrid on FeatureGridBlock {\n  heading\n  features {\n    title\n    body\n  }\n}": typeof types.FeatureGridFragmentDoc,
    "fragment Hero on HeroBlock {\n  heading\n  lede\n  actions {\n    label\n    href\n  }\n}": typeof types.HeroFragmentDoc,
    "query PageBySlug($slug: String!) {\n  Pages(where: {slug: {equals: $slug}}, limit: 1) {\n    docs {\n      id\n      title\n      slug\n      layout {\n        __typename\n        ...Hero\n        ...FeatureGrid\n        ...CallToAction\n      }\n    }\n  }\n}": typeof types.PageBySlugDocument,
};
const documents: Documents = {
    "fragment CallToAction on CallToActionBlock {\n  heading\n  label\n  href\n}": types.CallToActionFragmentDoc,
    "fragment FeatureGrid on FeatureGridBlock {\n  heading\n  features {\n    title\n    body\n  }\n}": types.FeatureGridFragmentDoc,
    "fragment Hero on HeroBlock {\n  heading\n  lede\n  actions {\n    label\n    href\n  }\n}": types.HeroFragmentDoc,
    "query PageBySlug($slug: String!) {\n  Pages(where: {slug: {equals: $slug}}, limit: 1) {\n    docs {\n      id\n      title\n      slug\n      layout {\n        __typename\n        ...Hero\n        ...FeatureGrid\n        ...CallToAction\n      }\n    }\n  }\n}": types.PageBySlugDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CallToAction on CallToActionBlock {\n  heading\n  label\n  href\n}"): typeof import('./graphql').CallToActionFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FeatureGrid on FeatureGridBlock {\n  heading\n  features {\n    title\n    body\n  }\n}"): typeof import('./graphql').FeatureGridFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Hero on HeroBlock {\n  heading\n  lede\n  actions {\n    label\n    href\n  }\n}"): typeof import('./graphql').HeroFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PageBySlug($slug: String!) {\n  Pages(where: {slug: {equals: $slug}}, limit: 1) {\n    docs {\n      id\n      title\n      slug\n      layout {\n        __typename\n        ...Hero\n        ...FeatureGrid\n        ...CallToAction\n      }\n    }\n  }\n}"): typeof import('./graphql').PageBySlugDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
