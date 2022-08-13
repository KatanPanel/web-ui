import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";
import { AuthenticatedOnlyGuard } from "@/features/auth/routing/authenticated-only.guard";

const FEATURE_NAME = "home";
export const HOME_ROUTE = "home";

export const HomeRoutes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: HOME_ROUTE,
		component: importView(FEATURE_NAME, "HomeView"),
		beforeEnter: AuthenticatedOnlyGuard
	}
];
