import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { renderSync } from 'node-sass'
import { terser } from 'rollup-plugin-terser'
import { writeFileSync } from 'fs'

const createPlugins = () => [
  nodeResolve(),
  vue({
    css: false
  }),
  commonjs(),
  css({
    output: function (styles, styleNodes) {
      const res = renderSync({
        data: styles,
        outputStyle: 'compressed'
      })

      writeFileSync('dist/vue-modal.css', res.css)
    }
  }),
  buble()
]

const esBuild = () => {
  const plugins = createPlugins()

  return [
    {
      input: './src/Modal.vue',
      output: {
        file: './dist/vue-modal.es.js',
        format: 'es',
        sourcemap: true,
        sourcemapExcludeSources: false
      },
      external: ['vue'],
      plugins
    }
  ]
}

const umdBuild = () => {
  const plugins = createPlugins()

  plugins.push(terser())

  return [
    {
      input: './src/Modal.vue',
      output: {
        file: './dist/vue-modal.umd.min.js',
        format: 'umd',
        name: 'VueModal',
        sourcemap: true,
        sourcemapExcludeSources: false,
        globals: {
          vue: 'Vue'
        }
      },
      external: ['vue'],
      plugins
    }
  ]
}

export default [
  // ES
  ...esBuild(),

  // UMD
  ...umdBuild()
]
