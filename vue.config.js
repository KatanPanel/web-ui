// eslint-disable-next-line @typescript-eslint/no-var-requires
const supportedLanguages = require("./src/supported-languages.json");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ContextReplacementPlugin } = require("webpack");

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
				/dayjs[/\\]locale$/,
				new RegExp(
					supportedLanguages
						.map((locale) => `${locale.tag}$`)
						.join("|")
				),
			]);
	},
};
