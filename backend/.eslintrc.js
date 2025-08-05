module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules', 'src/main.ts', 'src/app.module.ts'],
  rules: {
    // ===== RÈGLES SSOT STRICTES =====
    
    // 🚫 Interdiction des console.log
    'no-console': ['error', {
      allow: ['warn', 'error'] // Autorise uniquement warn et error pour cas critiques
    }],
    
    // 🚫 Interdiction des types any
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    
    // 🚫 Interdiction des imports relatifs (sauf DTOs et services locaux)
    'no-restricted-imports': ['error', 
      {
        patterns: [{
          group: ['../*', '../../*', '../../../*'],
          message: 'Utilisez les imports absolus avec @/ au lieu des imports relatifs',
        }],
      }
    ],
    
    // ===== AUTRES RÈGLES DE QUALITÉ =====
    
    // Types stricts
    '@typescript-eslint/explicit-function-return-type': 'off', // Trop contraignant
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Trop contraignant
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    
    // Conventions de nommage
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    
    // Imports inutilisés
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    
    // Complexité
    'max-lines-per-function': ['warn', {
      max: 50,
      skipBlankLines: true,
      skipComments: true,
    }],
    'max-lines': ['warn', {
      max: 300,
      skipBlankLines: true,
      skipComments: true,
    }],
    'complexity': ['warn', 10],
    
    // Sécurité
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    
    // Lisibilité
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    
    // Documentation
    'require-jsdoc': 'off', // Optionnel
  },
  overrides: [
    {
      // Assouplir les règles pour les tests
      files: ['*.spec.ts', '*.e2e-spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        'max-lines-per-function': 'off',
        'require-jsdoc': 'off',
      },
    },
    {
      // Assouplir les règles pour les DTOs
      files: ['**/dto/*.ts'],
      rules: {
        'require-jsdoc': 'off',
      },
    },
  ],
};