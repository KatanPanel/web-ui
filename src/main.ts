import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import VueNativeSock from "vue-native-websocket";
import {SOCKET_ONCLOSE, SOCKET_ONERROR, SOCKET_ONOPEN} from "@/store/mutations";
import Axios from 'axios';
import {Vue2Storage} from 'vue2-storage'

Vue.use(Vue2Storage, {
	prefix: 'katan_',
	driver: 'sessionStorage',
	ttl: 60 * 60 * 24 * 1000
})

Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(VueNativeSock, process.env.VUE_APP_GATEWAY_URL, {
	connectManually: true,
	reconnection: true,
	format: "json",
	mutations: {
		SOCKET_ONOPEN,
		SOCKET_ONCLOSE,
		SOCKET_ONERROR
	},
	store
});

Vue.config.devtools = process.env.NODE_ENV === "development";
Vue.config.productionTip = process.env.NODE_ENV === "development";

const vm: Vue = Vue.prototype;
vm.$helpers = { voca: require("voca") };
vm.$http = Axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 5000
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");