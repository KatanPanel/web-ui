import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";
import { AuthenticatedOnlyGuard } from "@/features/auth/routing/authenticated-only.guard";

const FEATURE_NAME = "units";
export const UNIT_ROUTE = "unit";

export const UnitsRoute: Array<RouteRecordRaw> = [
	{
		path: "/units/:unitId",
		name: UNIT_ROUTE,
		component: importView(FEATURE_NAME, "UnitView"),
		beforeEnter: AuthenticatedOnlyGuard
	}
];
