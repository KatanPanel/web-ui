const { ContextReplacementPlugin, IgnorePlugin } = require("webpack");
const supportedLanguages = require("./src/supported-languages.json");

process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
	pwa: {
		name: process.env.VUE_APP_NAME,
		manifestCrossorigin: "anonymous"
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
					`[/\\\\](${supportedLanguages
						.map((locale) => locale.tag)
						.join("|")})[/\\\\]index.js$`
				)
			]);

		config.plugin("ignore-plugin").use(IgnorePlugin, [/moment$/]);
	},
	transpileDependencies: ["vuex-module-decorators"]
};
