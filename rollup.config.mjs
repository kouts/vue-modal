import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'
import terser from '@rollup/plugin-terser'
import vue from 'rollup-plugin-vue'
import { minify } from 'csso'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { writeFileSync } from 'fs'

const createPlugins = () => [
  nodeResolve(),
  vue({
    css: false
  }),
  commonjs(),
  css({
    output(styles, styleNodes) {
      const minifiedCss = minify(styles).css

      writeFileSync('dist/vue-modal.css', minifiedCss)
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
