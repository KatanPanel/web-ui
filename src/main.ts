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
import store from "./store";
import router from "./router";
import i18n from "@/i18n";
import "./directives";
import "./setup/config";
import "./setup/hooks";
import "./setup/plugins";
import "./setup/layouts";
import Server from "@/views/server/Server.vue";

Vue.config.errorHandler = function (err: Error, vm: Vue, info: string) {
	vm.$consola.error({
		tag: "Global",
		message: info,
		args: [err],
	});
};

// Register the server component globally here, for some reason Vue
// is not detecting it as registered even though it is being used on a route.
// It will be used to display windows dynamically without losing its state.
Vue.component("window", Server);

export const vm = new Vue({
	store,
	router,
	i18n,
	render: (h) => h(App),
}).$mount("#app");
