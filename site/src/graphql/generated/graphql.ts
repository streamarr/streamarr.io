/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type CallToActionFragment = { heading: string, label: string, href: string };

export type FeatureGridFragment = { heading: string, features: Array<{ title: string | null, body: string | null }> | null };

export type HeroFragment = { heading: string, lede: string | null, actions: Array<{ label: string | null, href: string | null }> | null };

export type PageBySlugQueryVariables = Exact<{
  slug: string;
}>;


export type PageBySlugQuery = { Pages: { docs: Array<{ id: number, title: string, slug: string, layout: Array<
        | { __typename: 'CallToActionBlock', heading: string, label: string, href: string }
        | { __typename: 'FeatureGridBlock', heading: string, features: Array<{ title: string | null, body: string | null }> | null }
        | { __typename: 'HeroBlock', heading: string, lede: string | null, actions: Array<{ label: string | null, href: string | null }> | null }
      > | null }> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const CallToActionFragmentDoc = new TypedDocumentString(`
    fragment CallToAction on CallToActionBlock {
  heading
  label
  href
}
    `, {"fragmentName":"CallToAction"}) as unknown as TypedDocumentString<CallToActionFragment, unknown>;
export const FeatureGridFragmentDoc = new TypedDocumentString(`
    fragment FeatureGrid on FeatureGridBlock {
  heading
  features {
    title
    body
  }
}
    `, {"fragmentName":"FeatureGrid"}) as unknown as TypedDocumentString<FeatureGridFragment, unknown>;
export const HeroFragmentDoc = new TypedDocumentString(`
    fragment Hero on HeroBlock {
  heading
  lede
  actions {
    label
    href
  }
}
    `, {"fragmentName":"Hero"}) as unknown as TypedDocumentString<HeroFragment, unknown>;
export const PageBySlugDocument = new TypedDocumentString(`
    query PageBySlug($slug: String!) {
  Pages(where: {slug: {equals: $slug}}, limit: 1) {
    docs {
      id
      title
      slug
      layout {
        __typename
        ...Hero
        ...FeatureGrid
        ...CallToAction
      }
    }
  }
}
    fragment CallToAction on CallToActionBlock {
  heading
  label
  href
}
fragment FeatureGrid on FeatureGridBlock {
  heading
  features {
    title
    body
  }
}
fragment Hero on HeroBlock {
  heading
  lede
  actions {
    label
    href
  }
}`) as unknown as TypedDocumentString<PageBySlugQuery, PageBySlugQueryVariables>;