import Vue from "vue";
import { Vue2Storage } from "vue2-storage";
import VueMeta from "vue-meta";
import VueNativeSock from "vue-native-websocket";
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import {
	ON_SOCKET_CLOSE,
	ON_SOCKET_ERROR,
	ON_SOCKET_OPEN,
} from "@/store/mutations";
import store from "@/store";

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
		SOCKET_ONOPEN: ON_SOCKET_OPEN,
		SOCKET_ONCLOSE: ON_SOCKET_CLOSE,
		SOCKET_ONERROR: ON_SOCKET_ERROR,
	},
	store,
});
