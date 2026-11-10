import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts: unit tests render components, not the Start app.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // Globals exist only so Testing Library can register its cleanup; tests import from vitest.
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
