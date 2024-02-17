import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      App: path.resolve(__dirname, './src'),
      Components: path.resolve(__dirname, './src/components'),
      Store: path.resolve(__dirname, './src/store'),
      Helpers: path.resolve(__dirname, './src/helpers'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
        ],
      },
    }),
    tsconfigPaths(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  build: {
    target: 'esnext',
  },
})
