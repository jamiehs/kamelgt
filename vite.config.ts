import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      'zoomies': path.resolve(__dirname, '../zoomies/src/index.js'),
    },
  },
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
