import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render } from '@testing-library/react'
import type { ReactNode } from 'react'

/** Renders `ui` inside a router at `/`, for components that link to site paths. */
export function renderInRouter(ui: ReactNode) {
  const router = createRouter({
    routeTree: createRootRoute({ component: () => ui, notFoundComponent: () => ui }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })

  return { router, ...render(<RouterProvider router={router} />) }
}
