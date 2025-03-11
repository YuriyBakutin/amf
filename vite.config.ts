import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dirs: ['./src/data', './src/stores', './src/utils'],
      dts: 'auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      dts: 'components.d.ts.d.ts',
    }),
  ],
  server: {
    port: 3777,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
