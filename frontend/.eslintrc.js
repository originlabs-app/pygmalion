module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
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
    
    // 🚫 Interdiction des imports relatifs
    'no-restricted-imports': ['error', 
      {
        patterns: [{
          group: ['../*', './*'],
          message: 'Utilisez les imports absolus avec @/ au lieu des imports relatifs',
        }],
      }
    ],
    
    // ===== RÈGLES REACT =====
    
    // React 17+ JSX Transform
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    
    // Props validation
    'react/prop-types': 'off', // On utilise TypeScript
    'react/display-name': 'warn',
    
    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // ===== AUTRES RÈGLES DE QUALITÉ =====
    
    // Types stricts
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
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
        selector: 'type',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
    ],
    
    // Imports inutilisés
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    
    // Complexité des composants
    'max-lines-per-function': ['warn', {
      max: 150, // Plus permissif pour les composants React
      skipBlankLines: true,
      skipComments: true,
    }],
    
    // Sécurité
    '@typescript-eslint/no-empty-function': 'error',
    'react/no-danger': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-direct-mutation-state': 'error',
    
    // Performance
    'react/jsx-no-bind': ['warn', {
      allowArrowFunctions: true,
      allowFunctions: false,
      allowBind: false,
    }],
    
    // Accessibilité
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
  },
  overrides: [
    {
      // Assouplir les règles pour les tests
      files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        'max-lines-per-function': 'off',
      },
    },
    {
      // Configuration pages
      files: ['**/pages/**/*.tsx'],
      rules: {
        'max-lines-per-function': ['warn', { max: 200 }],
      },
    },
  ],
};