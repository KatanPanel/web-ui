import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";

const FEATURE_NAME = "blueprints";

export const BLUEPRINTS_ROUTES = "blueprints";
export const IMPORT_BLUEPRINT_ROUTE = "blueprints.import";

export const BlueprintsRoutes: Array<RouteRecordRaw> = [
	{
		path: "/blueprints",
		component: importView(FEATURE_NAME, "Blueprints"),
		children: [
			{
				path: "",
				name: BLUEPRINTS_ROUTES,
				component: importView(FEATURE_NAME, "BlueprintsHome")
			},
			{
				path: "import",
				name: IMPORT_BLUEPRINT_ROUTE,
				component: importView(FEATURE_NAME, "ImportBlueprint")
			}
		]
	}
];
