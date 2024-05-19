module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-hooks', 'react-refresh', 'prettier'],
  rules: {
    // React
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    // Common
    'no-console': 1,
    'no-lonely-if': 1,
    'no-unused-vars': 1,
    'no-trailing-spaces': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': [1, 'always'],
    indent: ['warn', 2],
    semi: [1, 'never'],
    quotes: ['error', 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
    'comma-dangle': ['error', 'never'], 
    'comma-spacing': 1,
    'arrow-spacing': 1,

    // Prettier
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none', 
      },
    ],
  },
}
