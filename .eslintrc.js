module.exports = {
  env: {
    browser: true,
    node: false,
  },
  extends: ['react-app', 'airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    camelcase: ['error', { ignoreImports: true }],
    'prettier/prettier': ['error'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-wrap-multilines': 'off',
    'flowtype/define-flow-type': 2,
  },
  globals: {
    process: true,
  },
};
