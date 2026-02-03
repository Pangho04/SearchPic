module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
  ignorePatterns: [
    'node_modules',
    'dist',
    'storybook-static',
    '.turbo',
    '*.config.js',
    '*.config.ts',
    '.eslintrc.cjs',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './apps/*/tsconfig.json',
      './apps/*/tsconfig.node.json',
      './packages/*/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [
          './apps/web/tsconfig.json',
          './apps/storybook/tsconfig.json',
          './packages/ui/tsconfig.json',
        ],
      },
    },
  },
};
