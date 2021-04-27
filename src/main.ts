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

import "reflect-metadata";
import "@/register-service-worker";
import store from "@/store";
import katan from "@/katan";
import Vue from "vue";
import App from "@/app/App.vue";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.use(VueI18n);

const isDevelopmentMode = process.env.NODE_ENV === "development";
Vue.config.devtools = isDevelopmentMode;
Vue.config.performance = isDevelopmentMode;
Vue.config.productionTip = isDevelopmentMode;

const { router, i18n } = katan();
new Vue({
	store,
	router,
	i18n,
	render: (h) => h(App)
}).$mount("#app");
