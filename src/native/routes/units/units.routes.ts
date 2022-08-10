import { RouteRecordRaw } from "vue-router";
import { importView } from "@/native/routes/app.router";
import { AuthenticatedOnlyGuard } from "@/native/guards/auth/authenticated-only.guard";

export const CREATE_NEW_UNIT_ROUTE = "units.create-new-unit";

export const UnitsRoutes: Array<RouteRecordRaw> = [
	{
		path: "/units",
		beforeEnter: AuthenticatedOnlyGuard,
		children: [
			{
				path: "new",
				name: CREATE_NEW_UNIT_ROUTE,
				component: importView("units/CreateNewUnitView.vue")
			}
		]
	}
];
