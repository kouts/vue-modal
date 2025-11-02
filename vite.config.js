import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  publicDir: 'public-vite',
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'vue-modal playground',
          description: 'Playground for vue-modal Vue.js 3',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@playground': resolve(__dirname, './playground'),
      '@root': resolve(__dirname, './'),
      '~bootstrap': 'bootstrap',
    },
  },
  rollupInputOptions: {
    input: resolve(__dirname, '/playground/main.js'), // custom main
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Make Bootstrap imports work with ~
        includePaths: ['node_modules'],
        // Import variables globally for all SCSS files
        additionalData: `@import "@playground/scss/variables";`,
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueModal',
      fileName: (format) => `vue-modal.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'vue-modal.css'
          }

          return assetInfo.name
        },
      },
    },
  },
})
