import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const API_TARGET = process.env.VITE_API_URL ?? 'http://localhost:3000';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src') },
    },
    server: {
        port: 5173,
        /* Same-origin in dev, so the httpOnly auth cookies just work — no CORS setup needed. */
        proxy: {
            '/api': {
                target: API_TARGET,
                changeOrigin: true,
                rewrite: (url) => url.replace(/^\/api/, ''),
            },
        },
    },
});
