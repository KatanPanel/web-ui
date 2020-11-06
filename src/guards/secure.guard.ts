import { NavigationGuardNext, Route } from "vue-router";
import store, { AUTH_MODULE, PANEL_MODULE } from "@/store";
import { AUTH_VERIFY } from "@/store/auth/actions";
import { AUTH_TOKEN_KEY } from "@/store/auth";
import { JOIN_PANEL } from "@/store/panel/actions";
import { LOGIN_ROUTE } from "@/router";
import Vue from "vue";
import { joinVuexModule } from "@/utils/text";

const vm: Vue = Vue.prototype;
export const SecureGuard = (
	to: Route,
	from: Route,
	next: NavigationGuardNext
) => {
	if (!vm.$storage.has(AUTH_TOKEN_KEY)) return next({ name: LOGIN_ROUTE });

	return store
		.dispatch(joinVuexModule(AUTH_MODULE, AUTH_VERIFY), {
			token: vm.$storage.get(AUTH_TOKEN_KEY),
		})
		.then(async () => {
			await store.dispatch(joinVuexModule(PANEL_MODULE, JOIN_PANEL));
			return next();
		})
		.catch(() => next({ name: LOGIN_ROUTE }));
};
