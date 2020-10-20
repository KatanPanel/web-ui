import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Panel from "@/views/Panel.vue";
import { loadLanguage } from "@/i18n";
import { Dictionary } from "vue-router/types/router";
import { AUTH_TOKEN_KEY } from "@/store/auth";
import { AUTH_MODULE } from "@/store";
import { AUTH_VERIFY } from "@/store/auth/actions";

export const HOME_ROUTE = "home";
export const LOGIN_ROUTE = "login";
export const PANEL_ROUTE = "panel";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: HOME_ROUTE,
		component: Home,
	},
	{
		path: "/login",
		name: LOGIN_ROUTE,
		component: Login,
	},
	{
		path: "/panel",
		name: PANEL_ROUTE,
		component: Panel,
		beforeEnter(to: Route, from: Route, next: NavigationGuardNext) {
			const vm: Vue = Vue.prototype;
			const token = vm.$storage.get(AUTH_TOKEN_KEY);

			vm.$store
				.dispatch(AUTH_MODULE.concat("/", AUTH_VERIFY), token)
				.then(next)
				.catch(() => {
					next({ name: LOGIN_ROUTE });
				});
		},
	},
];

// extension function
VueRouter.prototype.redirect = function (to: string) {
	// avoid arrow-function to be able to use explicit `this`
	window.location.href = this.resolve({ name: to }).href;
};

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
	const query = to.query as Dictionary<string>;
	if (query.lang) loadLanguage(query.lang, navigator.languages).then(next);
	else next();
});

export default router;
