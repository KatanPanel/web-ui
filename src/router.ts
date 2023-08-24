import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AuthRoutes } from "@/features/auth/auth.routes";
import { HomeRoutes } from "@/features/home/home.routes";
import { UnitsRoute } from "@/features/units/units.routes";
import { AuthenticatedOnlyGuard } from "@/features/auth/guards/authenticated-only.guard";
import { AccountsRoute } from "@/features/account/accounts.routes";
import { BlueprintsRoutes } from "@/features/blueprints/blueprints.routes";
import { UsersRoutes } from "@/features/users/users.routes";

export function importView(
	feature: string,
	path: string
): () => Promise<unknown> {
	return () =>
		import(
			/* webpackChunkName: "view-[request]" */ `@/features/${feature}/ui/views/${path}View.vue`
		);
}

const Router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: importView("platform", "Root"),
			beforeEnter: AuthenticatedOnlyGuard,
			children: [
				...HomeRoutes,
				...UnitsRoute,
				...AccountsRoute,
				...BlueprintsRoutes,
				...UsersRoutes
			]
		},
		...AuthRoutes
	] as Array<RouteRecordRaw>
});

export default Router;
