import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs-extra';

const resolve = (...args: string[]) => path.resolve(__dirname, ...args);

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig(() => ({
  root: resolve('views'),
  mode: isDev ? 'development' : 'production',
  resolve: {
    alias: {
      '@': `${resolve('views')}/`,
    },
  },
  build: {
    minify: isDev ? false : 'terser',
    outDir: resolve('extension/views'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        options: resolve('views/options/index.html'),
        popup: resolve('views/popup/index.html'),
        admin: resolve('views/admin/index.html'),
      },
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/"\/assets\//g, '"./../assets/');
      },
      buildStart() {
        fs.emptyDirSync(resolve('extension/views/assets'));
      },
      renderChunk(code: string, chunk) {
        if (/assets\/popup.(\S*).js/.test(chunk.fileName)) {
          return code.replace(/"\/assets\//g, '"./../assets/');
        }
        return code;
      },
    },
  ],

  optimizeDeps: {
    include: [
      'vue',
      '@ant-design/icons-vue',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        charset: false,
      },
    },
  },
}));
