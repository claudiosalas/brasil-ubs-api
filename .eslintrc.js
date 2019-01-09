// http://eslint.org/docs/user-guide/configuring

module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module'
  },
  'env': {
    'browser': true,
  },
  'extends': 'standard',
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow ;
    'semi': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}