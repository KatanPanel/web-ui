import { RouteRecordRaw } from "vue-router";
import { importView } from "@/native/routes/app.router";

export const AUTH_LOGIN_ROUTE = "auth.login";

export const AuthRoutes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: AUTH_LOGIN_ROUTE,
		component: importView("auth/AuthLoginView.vue")
	}
];
