import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";

const FEATURE_NAME = "blueprints";

export const BLUEPRINTS_ROUTES = "blueprints";

export const BlueprintsRoutes: Array<RouteRecordRaw> = [
	{
		path: "/blueprints",
		component: importView(FEATURE_NAME, "BlueprintsView"),
		children: [
			{
				path: "",
				name: BLUEPRINTS_ROUTES,
				component: importView(FEATURE_NAME, "BlueprintsHomeView")
			}
		]
	}
];
