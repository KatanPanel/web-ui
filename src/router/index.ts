import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import Panel from "@/views/panel/Panel.vue";
import { loadLanguage } from "@/i18n";
import { Dictionary } from "vue-router/types/router";
import store, { PANEL_MODULE } from "@/store";
import { LANGUAGE_STORAGE_KEY } from "@/store/mutations";
import { LOGIN_LAYOUT, PANEL_LAYOUT } from "@/layouts";
import { PANEL_SET_SERVER } from "@/store/panel/actions";
import PanelHome from "@/views/panel/PanelHome.vue";
import PanelAccount from "@/views/panel/account/PanelAccount.vue";
import PanelServer from "@/views/panel/server/PanelServer.vue";
import PanelPlugins from "@/views/panel/plugins/PanelPlugins.vue";
import { SecureGuard } from "@/guards/secure.guard";

export const HOME_ROUTE = "home";
export const LOGIN_ROUTE = "login";
export const PANEL_ROUTE = "panel";
export const PANEL_ACCOUNT_ROUTE = "panel.account";
export const PANEL_SERVER_ROUTE = "panel.server";
export const PANEL_PLUGINS_ROUTE = "panel.plugins";

Vue.use(VueRouter);

const vm: Vue = Vue.prototype;
const routes: Array<RouteConfig> = [
	{
		path: "/login",
		name: LOGIN_ROUTE,
		component: Login,
		meta: { layout: LOGIN_LAYOUT },
	},
	{
		path: "/",
		component: Panel,
		meta: { layout: PANEL_LAYOUT },
		beforeEnter: SecureGuard,
		children: [
			{
				path: "",
				name: PANEL_ROUTE,
				component: PanelHome,
			},
			{
				path: "account",
				name: PANEL_ACCOUNT_ROUTE,
				component: PanelAccount,
			},
			{
				path: "server/:serverId",
				name: PANEL_SERVER_ROUTE,
				component: PanelServer,
				props: true,
				beforeEnter(to: Route, from: Route, next: NavigationGuardNext) {
					store
						.dispatch(PANEL_MODULE.concat("/", PANEL_SET_SERVER), {
							serverId: to.params.serverId,
						})
						.then(next);
				},
			},
			{
				path: "plugins",
				name: PANEL_PLUGINS_ROUTE,
				component: PanelPlugins,
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
