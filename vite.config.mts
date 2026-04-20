import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { existsSync } from 'fs';

const localZoomies = path.resolve(__dirname, '../zoomies/src/index.js');

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            ...(existsSync(localZoomies) ? { '@jamiehs/zoomies': localZoomies } : {}),
        },
    },
    build: {
        outDir: 'build',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        exclude: [...configDefaults.exclude],
    },
});
