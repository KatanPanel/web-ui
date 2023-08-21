import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";

const FEATURE_NAME = "users";

export const USERS_ROUTE = "users";

export const UsersRoutes: Array<RouteRecordRaw> = [
	{
		path: "/users",
		name: USERS_ROUTE,
		component: importView(FEATURE_NAME, "Users")
	}
];
