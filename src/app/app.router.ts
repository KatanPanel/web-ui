import { KatanModule } from "@/di";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import { lazyInject } from "@/di";
import Vue from "vue";
import { default as I18n } from "@/i18n";

Vue.use(VueRouter);

export default class KatanRouter {
	public readonly routes: RouteConfig[] = [];

	constructor(readonly router: VueRouter) {}

	public setup(): void {
		this.router.beforeEach(
			(to: Route, from: Route, next: NavigationGuardNext) => {
				this.beforeEach(to, from, next);
			}
		);

		this.router.addRoutes(this.routes);
	}

	private beforeEach(
		to: Route,
		from: Route,
		next: NavigationGuardNext
	): void {
		console.log("LLLLLLLLLLLLLLL joining into", to);

		const targetModuleName = to.matched[0].meta.module;
		console.log("trying to load module", targetModuleName);
		I18n.loadLanguage(navigator.language.toLowerCase(), navigator.languages)
			.then(() => {
				// const isServerRoute = false;
				// to.matched.findIndex(
				// 	(route: RouteRecord) =>
				// 		route.components["default"] === Server
				// ) !== -1;
				// const serverIdValue = parseInt(from.params.serverId);
				// const openWindows = this.appNavigationStore.getOpenWindows;
				// if (isServerRoute) {
				// const dataFactory = async () => await
				// this.serversService.findServer(serverIdValue);
				// 	const dataFactory = async () => undefined;
				// 	if (to.params.serverId === from.params.serverId) {
				// 		const window = this.appNavigationStore.getWindowByData(
				// 			serverIdValue
				// 		) as Window;
				// 		this.appNavigationStore.updateWindow(window.id, {
				// 			location: routeToLocation(to)
				// 		});
				// 		return next();
				// 	} else {
				// 		if (openWindows.length == 0)
				// 			return next(() =>
				// 				this.appNavigationStore.resolveWindowThenUpdate(
				// 					to.params.serverId,
				// 					to,
				// 					dataFactory
				// 				)
				// 			);
				// 		else {
				// 			return this.appNavigationStore
				// 				.resolveWindowThenUpdate(
				// 					to.params.serverId,
				// 					to,
				// 					dataFactory
				// 				)
				// 				.then(() => next());
				// 		}
				// 	}
				// }
				// ensure that all windows are no longer visible when exiting the server route.
				// for (const window of openWindows) {
				// 	this.appNavigationStore.updateWindow(window.id, {
				// 		state: MinimizedWindowState
				// 	});
				// }
			})
			.finally(() => next());
	}
}
