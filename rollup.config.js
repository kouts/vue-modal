import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
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
    css({
      output: 'dist/vue-modal.css'
    }),
    vue({
      css: false
    }),
    terser({
      sourcemap: true,
      include: [/^.+\.min\.js$/]
    })
  ]
};