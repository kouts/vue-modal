module.exports = {
  extends: ['eslint-config-kouts/vue2'],
  overrides: [
    {
      // Disable multi-word-component-names for docs examples
      files: ['docs/**/*.{vue,js}'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
