module.exports = {
	root: true,
	env: {
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"no-console": "off",
		"no-debugger": "off",
		semi: "off",
		"vue/no-parsing-error": "off",
		"vue/attribute-hyphenation": "warn",
		"vue/html-indent": "off",
		"vue/html-self-closing": "warn",
		"vue/no-template-shadow": "error",
		"vue/require-prop-types": "error",
		"vue/no-confusing-v-for-v-if": "error",
		"vue/no-v-html": "error",
		"vue/order-in-components": "error",
		"vue/this-in-template": "error",
		"vue/camelcase": "error",
		"vue/comma-dangle": "warn",
		"vue/script-indent": ["error", "tab"],
		"vue/max-attributes-per-line": "off",
		"@typescript-eslint/no-explicit-any": "off",
	},
	overrides: [
		{
			files: [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)",
			],
			env: {
				jest: true,
			},
		},
	],
	extends: [
		"plugin:vue/strongly-recommended",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"@vue/prettier",
		"@vue/prettier/@typescript-eslint",
	],
};
