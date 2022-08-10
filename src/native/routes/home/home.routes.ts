import { RouteRecordRaw } from "vue-router";
import { importView } from "@/native/routes/app.router";
import { AuthenticatedOnlyGuard } from "@/native/guards/auth/authenticated-only.guard";

export const HOME_ROUTE = "home";

export const HomeRoutes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: HOME_ROUTE,
		component: importView("home/HomeView.vue"),
		beforeEnter: AuthenticatedOnlyGuard
	}
];
