import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig(() => {
    return {
        base: '/maplestoryn-price-tracker/',
        plugins: [
            vue(),
            Components({
                resolvers: [PrimeVueResolver()]
            })
        ],
        server: {
            proxy: {
                '/api-prices': {
                    target: 'https://aioblob.blob.core.windows.net/msn',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api-prices/, '')
                }
            }
        }
    };
});
