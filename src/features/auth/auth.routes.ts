import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";

const FEATURE_NAME = "auth";
export const AUTH_LOGIN_ROUTE = "auth.login";

export const AuthRoutes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: AUTH_LOGIN_ROUTE,
		component: importView(FEATURE_NAME, "Login")
	}
];
