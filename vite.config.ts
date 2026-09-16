import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, rootDir, '');
    const API_TARGET = env.VITE_API_URL || 'http://localhost:3000';

    return {
        plugins: [react()],
        resolve: {
            alias: { '@': path.resolve(rootDir, './src') },
        },
        server: {
            port: 5173,
            /* Same-origin in dev, so the httpOnly auth cookies just work — no CORS setup needed. */
            proxy: {
                '/api': {
                    target: API_TARGET,
                    changeOrigin: true,
                    cookieDomainRewrite: '',
                    rewrite: (url) => url.replace(/^\/api/, ''),
                },
            },
        },
    };
});
