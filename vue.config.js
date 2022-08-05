const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const VueI18nPlugin = require("@intlify/unplugin-vue-i18n/webpack");

process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	pwa: {
		name: process.env.VUE_APP_NAME,
		manifestCrossorigin: "anonymous",
	},
	configureWebpack: {
		plugins: [
			VueI18nPlugin({
				include: path.resolve(__dirname, "./src/lang/**"),
			}),
		],
	},
	chainWebpack: (config) => {
		const svgRule = config.module.rule("svg");

		svgRule.uses.clear();

		svgRule
			.use("vue-loader")
			.loader("vue-loader")
			.end()
			.use("vue-svg-loader")
			.loader("vue-svg-loader")
	},
});
