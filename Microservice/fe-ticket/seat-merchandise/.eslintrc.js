module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.jsx',
          '.tsx',
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    'linebreak-style': 0,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/no-unresolved': 'off',
  },
};
