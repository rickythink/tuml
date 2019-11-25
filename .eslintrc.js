module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:jest/recommended",
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest",
        "@typescript-eslint"
    ],
    "rules": {
    },
    // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
    overrides: [
        {
          files: ['*.ts', '*.tsx'],
          rules: {
            '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
          }
        }
      ]
};