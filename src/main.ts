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
import App from "./App.vue";
import "./registerServiceWorker";
import store, { CLIENT_SETTINGS_CACHE_KEY } from "./store";
import router from "./router";
import i18n from "@/i18n";
import "./setup/config";
import "./setup/hooks";
import "./setup/plugins";
import "./setup/layouts";
import "./setup/directives";
import {
	ClientSettings,
	DARK_THEME,
	updateClientSettings,
} from "@/common/client-settings";
import { ERROR_HANDLER_LOG_TAG } from "@/logging";
import api from "@/api";

Vue.config.errorHandler = (err: Error, vm: Vue, info: string) => {
	vm.$log.error({
		tag: ERROR_HANDLER_LOG_TAG,
		message: info,
		args: [err],
	});
};

const proto: Vue = Vue.prototype;
proto.$api = api;
let clientSettings: ClientSettings | undefined = undefined;

// preload client settings if defined before
if (proto.$storage.has(CLIENT_SETTINGS_CACHE_KEY))
	updateClientSettings(
		(clientSettings = proto.$storage.get(CLIENT_SETTINGS_CACHE_KEY))
	);

// sets the default dark theme if it is set as a preference
if (
	!clientSettings?.theme &&
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches
) {
	updateClientSettings(
		{
			theme: DARK_THEME,
		},
		false
	);
}

export const vm = new Vue({
	store,
	router,
	i18n,
	render: (h) => h(App),
}).$mount("#app");
