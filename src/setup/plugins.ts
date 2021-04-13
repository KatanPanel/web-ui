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
import { Vue2Storage } from "vue2-storage";
import VueMeta from "vue-meta";
import VueNativeSock from "vue-native-websocket";
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import VTooltip from "v-tooltip";
import {
	ON_SOCKET_CLOSE,
	ON_SOCKET_ERROR,
	ON_SOCKET_MESSAGE,
	ON_SOCKET_OPEN,
} from "@/store/mutations";
import store, { ROOT_MODULE } from "@/store";
import { joinBySlash } from "@/utils/text";
import VModal from "vue-js-modal/dist/index.nocss.js";
import { VueJSModalOptions } from "vue-js-modal";

Vue.use<VueJSModalOptions>(VModal, {
	dialog: false,
});
Vue.use(VueSvgInlinePlugin);
Vue.use(Vue2Storage, {
	prefix: "katan_",
	driver: "sessionStorage",
	ttl: 60 * 60 * 24 * 1000,
});

Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(VueNativeSock, process.env.VUE_APP_GATEWAY_URL, {
	connectManually: true,
	reconnection: true,
	format: "json",
	mutations: {
		SOCKET_ONOPEN: joinBySlash(ROOT_MODULE, ON_SOCKET_OPEN),
		SOCKET_ONCLOSE: joinBySlash(ROOT_MODULE, ON_SOCKET_CLOSE),
		SOCKET_ONERROR: joinBySlash(ROOT_MODULE, ON_SOCKET_ERROR),
		SOCKET_ONMESSAGE: joinBySlash(ROOT_MODULE, ON_SOCKET_MESSAGE),
	},
	store,
});

Vue.use(VTooltip, {
	defaultClass: "v--tooltip",
});

// disable tooltips on mobile devices
(VTooltip as any).enabled = window.innerWidth >= 768;
