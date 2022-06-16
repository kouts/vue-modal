import buble from '@rollup/plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import { renderSync } from 'node-sass'
import { terser } from 'rollup-plugin-terser'
import { writeFileSync } from 'fs'

export default {
  input: './src/Modal.vue',
  output: [
    {
      file: './dist/vue-modal.es.js',
      format: 'es',
      sourcemap: true,
      sourcemapExcludeSources: false
    },
    {
      file: './dist/vue-modal.umd.min.js',
      format: 'umd',
      name: 'VueModal',
      sourcemap: true,
      sourcemapExcludeSources: false,
      globals: {
        vue: 'Vue'
      }
    }
  ],
  external: ['vue'],
  plugins: [
    resolve(),
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
    vue({
      css: false
    }),
    buble(),
    terser({
      sourcemap: true,
      include: [/^.+\.min\.js$/]
    })
  ]
}
