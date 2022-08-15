import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";

const FEATURE_NAME = "home";

export const HOME_ROUTE = "home";
export const ABOUT_ROUTE = "about";

export const HomeRoutes: Array<RouteRecordRaw> = [
	{
		path: "",
		name: HOME_ROUTE,
		component: importView(FEATURE_NAME, "HomeView")
	},
	{
		path: "about",
		name: ABOUT_ROUTE,
		component: importView(FEATURE_NAME, "AboutView")
	}
];
