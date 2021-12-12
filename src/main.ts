import "reflect-metadata";
import { KatanModule } from "@/di";
import "@/register-service-worker";
import store from "@/app/app.store";
import Vue from "vue";
import App from "@/app/App.vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import { generateIdAndAddToCache, setContainer } from "inversify-props";
import { injectable } from "inversify";
import KatanRouter from "./app/app.router";
import { loadAllModules } from "./di/module-loader";
import { Module } from "./di";
import AuthModule from "./app/auth/auth.module";

const isProductionMode = process.env.NODE_ENV === "production";
Vue.config.devtools = !isProductionMode;
Vue.config.performance = !isProductionMode;
Vue.config.productionTip = !isProductionMode;

const baseContainer = setContainer({
	autoBindInjectable: false,
	skipBaseClassChecks: true,
	defaultScope: "Singleton"
});

const vmRouter = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: []
});

const vm = new Vue({
	store,
	router: vmRouter,
	i18n: new VueI18n({
		fallbackLocale: "en-US"
	}),
	render: (h) => h(App)
});

// bind Vue global object
baseContainer.bind(generateIdAndAddToCache(Vue)).toConstantValue(vm);

// init will be called when the App is mounted
vm.$once("init", () => {
	const diRouter = new KatanRouter(vmRouter);
	loadAllModules(baseContainer, store, diRouter, undefined);

	diRouter.setup();
	vm.$emit("loaded");
});

vm.$mount("#app");
