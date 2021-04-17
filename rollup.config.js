import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

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
  external: [
    'vue'
  ],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: 'vue-modal.css',
      plugins: [cssnano()]
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
};
