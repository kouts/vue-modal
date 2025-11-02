import { config } from '@kouts/eslint-config'

export default [
  ...config({
    vueVersion: 2,
    ts: false,
    env: ['browser'],
  }),
  {
    name: 'project-ignores',
    ignores: ['fixtures/**', 'page/**'],
  },
  {
    name: 'project-rules',
    // Disable multi-word-component-names
    files: ['playground/**/*.{vue,js}', 'src/**/*.vue', 'docs/**/*.{vue,js}'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/v-on-event-hyphenation': [
        'error',
        'always',
        {
          autofix: false,
          ignore: ['update:modelValue'],
        },
      ],
    },
  },
  {
    name: 'docs-playground-overrides',
    // Disable vue/require-name-property for docs and playground
    files: ['docs/**/*.vue', 'playground/**/*.vue'],
    rules: {
      'vue/require-name-property': 'off',
    },
  },
]
