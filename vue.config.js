process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
	pwa: {
		name: "Katan",
		manifestCrossorigin: "anonymous",
	},
	chainWebpack: (config) => {
		config.module
			.rule("vue")
			.use("vue-svg-inline-loader")
			.loader("vue-svg-inline-loader");
	},
};
