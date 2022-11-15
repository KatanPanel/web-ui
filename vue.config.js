const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const VueI18nPlugin = require("@intlify/unplugin-vue-i18n/webpack");

process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	pwa: {
		name: "Katan",
		manifestCrossorigin: "anonymous"
	},
	configureWebpack: {
		plugins: [
			VueI18nPlugin({
				include: path.resolve(__dirname, "./src/lang/**")
			})
		]
	}
});
