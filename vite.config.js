import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite';


export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue', // 自动引入 Vue API
        'vue-router', // 如果需要，自动引入 Vue Router API
      ],
      dts: true, // 生成类型声明文件
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 19002,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/dev-api': {
        target: 'http://localhost:19000',
        // target: '/',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, '')
      }
    }
  },

})
