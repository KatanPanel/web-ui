// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ContextReplacementPlugin, IgnorePlugin } = require("webpack");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const supportedLanguages = require("./src/supported-languages.json");

process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
	pwa: {
		name: process.env.VUE_APP_NAME,
		manifestCrossorigin: "anonymous",
	},
	chainWebpack: (config) => {
		config.module
			.rule("vue")
			.use("vue-svg-inline-loader")
			.loader("vue-svg-inline-loader");

		config
			.plugin("context-replacement")
			.use(ContextReplacementPlugin, [
				/date-fns[/\\]/,
				new RegExp(
					`[/\\\\](${supportedLanguages.join("|")})[/\\\\]index.js$`
				),
			]);

		config.plugin("ignore-plugin").use(IgnorePlugin, [/moment$/]);
	},
};
