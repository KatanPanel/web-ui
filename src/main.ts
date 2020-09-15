import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import VueNativeSock from "vue-native-websocket";
import { socketMutations } from "@/store/mutations";
import Axios from 'axios';

Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(VueNativeSock, process.env.VUE_APP_GATEWAY_URL, {
	connectManually: true,
	format: "json",
	mutations: socketMutations,
	store
});

Vue.config.devtools = process.env.NODE_ENV === "development";
Vue.config.productionTip = process.env.NODE_ENV === "development";
Vue.prototype.$helpers = { voca: require("voca") };
Vue.prototype.$axios = Axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	maxRedirects: 1
});

const vm = new Vue({
	router,
	store,
	render: h => h(App)
});

Vue.prototype.store = store
vm.$mount("#app");
