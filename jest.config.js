module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  coverageReporters: ['text', 'json-summary'],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@playground/(.*)$': '<rootDir>/playground/$1',
    '^@root/(.*)$': '<rootDir>/$1'
  }
}
