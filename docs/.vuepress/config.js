import * as path from 'path'
import * as url from 'url'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { vueExamplePlugin } from 'vuepress-plugin-vue-example'
import { webpackBundler } from '@vuepress/bundler-webpack'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default defineUserConfig({
  plugins: [
    vueExamplePlugin({
      componentsPath: '/docs/.examples/'
    }),
    docsearchPlugin({
      apiKey: 'b1beebce60b696f3ab59d523bdc04b94',
      indexName: 'vue-modal',
      appId: 'G4DW29QPYK'
    })
  ],
  dest: 'public',
  title: 'vue-modal',
  description: 'A modal plugin for Vue 3',
  bundler: webpackBundler({
    postcss: {},
    vue: {}
  }),
  theme: defaultTheme({
    contributors: false,
    repo: 'https://github.com/kouts/vue-modal/tree/next',
    colorMode: 'light',
    colorModeSwitch: false,
    sidebar: [
      {
        link: '/',
        text: 'Introduction'
      },
      {
        link: '/installation/',
        text: 'Installation'
      },
      {
        link: '/usage/',
        text: 'Usage'
      },
      {
        link: '/options/',
        text: 'Options'
      },
      {
        text: 'Examples',
        collapsable: true,
        children: [
          {
            link: '/examples/basic/',
            text: 'Basic'
          },
          {
            link: '/examples/drawer/',
            text: 'Sidebar / Drawer'
          },
          {
            link: '/examples/animations/',
            text: 'Animations'
          },
          {
            link: '/examples/prevent-body-scroll/',
            text: 'Prevent body scroll'
          },
          {
            link: '/examples/prevent-close/',
            text: 'Prevent modal from closing'
          },
          {
            link: '/examples/customizing/',
            text: 'Customizing'
          }
        ]
      }
    ]
  }),
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicons/apple-icon-57x57.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicons/apple-icon-60x60.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicons/apple-icon-72x72.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicons/apple-icon-76x76.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicons/apple-icon-114x114.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicons/apple-icon-120x120.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicons/apple-icon-144x144.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicons/apple-icon-152x152.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-icon-180x180.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/android-icon-192x192.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicons/favicon-96x96.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/favicons/manifest.json' }],
    ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
    ['meta', { name: 'msapplication-TileImage', content: '/favicons/ms-icon-144x144.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],
  alias: {
    '@': path.resolve(__dirname, '../../src'),
    '@playground': path.resolve(__dirname, '../../playground'),
    '@root': path.resolve(__dirname, '../../')
  }
})
