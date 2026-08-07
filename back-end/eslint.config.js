const eslint = require("@eslint/js");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["node_modules/", "coverage/"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
