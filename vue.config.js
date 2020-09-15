process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
	pwa: {
		name: "Katan",
		manifestCrossorigin: "anonymous"
	}
};
