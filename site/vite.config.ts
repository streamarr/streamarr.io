import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // The CMS dev server owns 3000.
    port: 3001,
  },
  plugins: [
    tanstackStart({
      // The site ships as static files: every page is rendered at build time, starting at `/` and
      // following links. A page that fails to render fails the build.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    // React's plugin must come after Start's.
    viteReact(),
  ],
})
