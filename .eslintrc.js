module.exports = {
  extends: ['@kouts/eslint-config/vue3'],
  overrides: [
    {
      // Disable multi-word-component-names
      files: ['playground/**/*.{vue,js}', 'src/**/*.vue', 'docs/**/*.{vue,js}'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/v-on-event-hyphenation': [
          'error',
          'always',
          {
            autofix: false,
            ignore: ['update:modelValue']
          }
        ]
      }
    }
  ]
}
