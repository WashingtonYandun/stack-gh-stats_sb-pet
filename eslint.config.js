import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            eqeqeq: ["error", "always"],
            curly: "error",

            "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
            "no-undef": "error",

            indent: ["error", 4],
            quotes: ["error", "double", { avoidEscape: true }],
            semi: ["error", "always"],
            "comma-dangle": ["error", "always-multiline"],

            "prefer-const": "error",
            "no-var": "error",
            "arrow-spacing": ["error", { before: true, after: true }],
        },
    },
];
