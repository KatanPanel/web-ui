module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
	plugins: ["prettier"],
	parserOptions: {
		requireConfigFile: true,
		ecmaVersion: 6,
		sourceType: "module",
		parser: "@typescript-eslint/parser"
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-unused-vars": ["error", { args: "none" }]
	},
	overrides: [
		{
			files: [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/units/**/*.spec.{j,t}s?(x)"
			],
			env: {
				jest: true
			}
		}
	]
};
