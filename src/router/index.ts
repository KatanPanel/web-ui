import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Panel from "@/views/panel/Panel.vue";
import { loadLanguage } from "@/i18n";
import { Dictionary } from "vue-router/types/router";
import { AUTH_TOKEN_KEY } from "@/store/auth";
import store, { AUTH_MODULE, PANEL_MODULE } from "@/store";
import { AUTH_VERIFY } from "@/store/auth/actions";
import { LANGUAGE_STORAGE_KEY } from "@/store/mutations";
import Account from "@/views/panel/account/Account.vue";
import { IS_AUTHENTICATED } from "@/store/auth/getters";
import Server from "@/views/panel/server/Server.vue";
import { HOME_LAYOUT, LOGIN_LAYOUT, PANEL_LAYOUT } from "@/layouts";
import { JOIN_PANEL, PANEL_SET_SERVER } from "@/store/panel/actions";
import PanelHome from "@/views/panel/PanelHome.vue";

export const HOME_ROUTE = "home";
export const LOGIN_ROUTE = "login";
export const PANEL_ROUTE = "panel";
export const ACCOUNT_ROUTE = "account";
export const SERVER_ROUTE = "server";

Vue.use(VueRouter);

const vm: Vue = Vue.prototype;
const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: HOME_ROUTE,
		component: Home,
		meta: { layout: HOME_LAYOUT },
		beforeEnter(to: Route, from: Route, next: NavigationGuardNext) {
			if (!store.getters[AUTH_MODULE.concat("/", IS_AUTHENTICATED)])
				return next();
			else return next({ name: LOGIN_ROUTE });
		},
	},
	{
		path: "/login",
		name: LOGIN_ROUTE,
		component: Login,
		meta: { layout: LOGIN_LAYOUT },
	},
	{
		path: "/panel",
		component: Panel,
		meta: { layout: PANEL_LAYOUT },
		beforeEnter(to: Route, from: Route, next: NavigationGuardNext) {
			if (store.getters[AUTH_MODULE.concat("/", IS_AUTHENTICATED)])
				return next();

			store
				.dispatch(AUTH_MODULE.concat("/", AUTH_VERIFY), {
					token: vm.$storage.get(AUTH_TOKEN_KEY),
				})
				.then(() =>
					store.dispatch(PANEL_MODULE.concat("/", JOIN_PANEL))
				)
				.then(next)
				.catch(() => next({ name: LOGIN_ROUTE }));
		},
		children: [
			{
				path: "",
				name: PANEL_ROUTE,
				component: PanelHome,
			},
			{
				path: "account",
				name: ACCOUNT_ROUTE,
				component: Account,
			},
			{
				path: "server/:serverId",
				name: SERVER_ROUTE,
				component: Server,
				props: true,
				alias: "servidor",
				beforeEnter(to: Route, from: Route, next: NavigationGuardNext) {
					store
						.dispatch(PANEL_MODULE.concat("/", PANEL_SET_SERVER), {
							serverId: to.params.serverId,
						})
						.then(next);
				},
			},
		],
	},
	{
		path: "*",
		redirect: "/",
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

router.beforeEach(async (to: Route, from: Route, next: NavigationGuardNext) => {
	loadLanguage(
		vm.$storage.get(LANGUAGE_STORAGE_KEY) ||
			(to.query as Dictionary<string>).lang ||
			navigator.language,
		navigator.languages
	).then(next);
});

export default router;
