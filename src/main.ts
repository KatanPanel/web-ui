import "reflect-metadata";
import "@/register-service-worker";
import store from "@/store";
import init from "@/katan";
import Vue from "vue";
import App from "@/app/App.vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

const isProductionMode = process.env.NODE_ENV === "production";
Vue.config.devtools = !isProductionMode;
Vue.config.performance = !isProductionMode;
Vue.config.productionTip = !isProductionMode;

const vm = new Vue({
	store,
	router: new VueRouter({
		mode: "history",
		base: process.env.BASE_URL,
		routes: []
	}),
	i18n: new VueI18n({
		fallbackLocale: "en-US"
	}),
	render: (h) => h(App)
});

vm.$once("init", () => {
	init(vm, () => vm.$emit("loaded"));
});

vm.$mount("#app");
