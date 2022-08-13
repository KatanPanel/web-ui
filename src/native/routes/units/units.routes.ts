import { RouteRecordRaw } from "vue-router";
import { importView } from "@/native/routes/app.router";
import { AuthenticatedOnlyGuard } from "@/native/guards/auth/authenticated-only.guard";

export const UNIT_ROUTE = "unit";

export const UnitsRoute: Array<RouteRecordRaw> = [
	{
		path: "/units/:unitId",
		name: UNIT_ROUTE,
		component: importView("units/UnitView.vue"),
		beforeEnter: AuthenticatedOnlyGuard
	}
];
