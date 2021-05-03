module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
	ignorePatterns: [
		'**/node_modules/**',
		'{tmp,temp}/**',
		'**/*.min.js',
		'vendor/**',
		'dist/**',
    'public/**'
	],  
  overrides: [
    {
      'files': ['*.json'],
      'rules': {
        'quotes': [2, 'double']
      }
    },
		{
			files: ['*.spec.js'],
			env: {
				jest: true
			}
		}
  ],
  rules: {
    // Windows style line breaks
    'linebreak-style': 0,

    // Console and debugger settings depending whether we're on production or not
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Custom for vue/recommended preset
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',

    // Custom rules standard
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ]
  }
};
