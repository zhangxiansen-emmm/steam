module.exports = {
  'env': {
    'browser': true,
    'es2020': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      globalReturn: true, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
    },
    'ecmaVersion': 7,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [1, 2],
    'linebreak-style': ['off', 'window'],
    'quotes': [1, 'single'],
    'semi': [1, 'never'],
    'semi-spacing': 0,
    'no-extra-semi': 1,
    'no-unused-vars': [1, { 'vars': 'all', 'args': 'none' }
    ],
    'no-trailing-spaces': 2,
    'no-console': 1
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}
