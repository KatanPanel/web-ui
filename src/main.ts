import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import VueNativeSock from "vue-native-websocket";
import {
	ON_SOCKET_CLOSE,
	ON_SOCKET_ERROR,
	ON_SOCKET_OPEN,
} from "@/store/mutations";
import Axios from "axios";
import { Vue2Storage } from "vue2-storage";
import i18n from "@/i18n";
import "./directives";

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

const isDevelopmentMode = process.env.NODE_ENV === "development";
Vue.config.devtools = isDevelopmentMode;
Vue.config.performance = isDevelopmentMode;
Vue.config.productionTip = !isDevelopmentMode;

const vm: Vue = Vue.prototype;
vm.$isDevelopmentMode = isDevelopmentMode;
vm.$helpers = { voca: require("voca") };
vm.$http = Axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 5000,
});

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App),
}).$mount("#app");
