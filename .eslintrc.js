module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["@typescript-eslint", "react-hooks"],
    rules: {
        "prefer-const": "error",
        "no-empty-pattern": "off",
        "no-case-declarations": "off",
        "no-debugger": "warn",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: true,
                argsIgnorePattern: "^_",
            },
        ],

        "react/prop-types": "off",
        "react/display-name": "off",
        "react/no-children-prop": "warn",
        "react/no-deprecated": "warn",
        "no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        name: "lodash",
                        message:
                            "Please use the default import from 'lodash/methodYouWantToImport' instead.",
                    },
                ],
            },
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-prototype-builtins": "off",
        "@typescript-eslint/no-inferrable-types": "off",
    },
    globals: {
        __DEV__: true,
    },
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
}
