/*
 * Copyright (c) 2020-present Katan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Vue from "vue";

const isDevelopmentMode = process.env.NODE_ENV === "development";
Vue.config.devtools = isDevelopmentMode;
Vue.config.performance = isDevelopmentMode;
Vue.config.productionTip = isDevelopmentMode;

const vm: Vue = Vue.prototype;
vm.$website = {
	name: process.env.VUE_APP_NAME,
	version: process.env.VUE_APP_VERSION,
	url: process.env.VUE_APP_KATAN_WEBSITE,
};

function configValue(key: string): string {
	return isDevelopmentMode ? process.env[key.substr(1)] : key;
}

vm.$config = {
	appName: configValue("$VUE_APP_NAME"),
	appVersion: configValue("$VUE_APP_VERSION"),
	appWebsite: configValue("$VUE_APP_KATAN_WEBSITE"),
	apiUrl: configValue("$VUE_APP_KATAN_SERVER_API"),
	wsUrl: configValue("$VUE_APP_KATAN_SERVER_WS"),
	gitCommit: configValue("$VUE_APP_KATAN_GIT_COMMIT"),
	gitBranch: configValue("$VUE_APP_KATAN_GIT_BRANCH"),
};
