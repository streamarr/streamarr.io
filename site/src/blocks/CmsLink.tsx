import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

// `//host/path` starts with a slash but names another site.
function isSitePath(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

/**
 * A link whose address an editor typed. A site path goes through the router, so the next page's
 * data comes from its prebuilt file; anything else is an ordinary link.
 */
export function CmsLink({ href, children }: { href: string; children: ReactNode }) {
  if (!isSitePath(href)) return <a href={href}>{children}</a>

  return <Link to={href}>{children}</Link>
}
