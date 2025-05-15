import tailwind from 'eslint-plugin-tailwindcss';

export default [
  {
    extends: [
      'next/core-web-vitals',
      'prettier',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:tailwindcss/recommended',
    ],
    plugins: ['prettier', 'tailwindcss', '@typescript-eslint'], // Ajout du plugin TypeScript
    parser: '@typescript-eslint/parser', // Ajout du parser pour TypeScript
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
        },
      ],
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      'react/jsx-tag-spacing': [
        'error',
        {
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never',
        },
      ],
      ...tailwind.configs['flat/recommended'],
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
        rules: {
          '@typescript-eslint/no-unused-vars': 'warn',
        },
      },
    ],
  },
];
