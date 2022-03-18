import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueJsx({ optimize: true, transformOn: true }),
  ],
  server: {
    host: '0.0.0.0',
  },
});
