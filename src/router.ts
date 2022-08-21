import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AuthRoutes } from "@/features/auth/routing/auth.routes";
import { HomeRoutes } from "@/features/home/routing/home.routes";
import { UnitsRoute } from "@/features/units/routing/units.routes";
import { AuthenticatedOnlyGuard } from "@/features/auth/routing/authenticated-only.guard";
import { AccountsRoute } from "@/features/account/routing/accounts.routes";
import { BlueprintsRoutes } from "@/features/blueprints/routing/blueprints.routes";

export function importView(
	featureName: string,
	path: string
): () => Promise<unknown> {
	return () =>
		import(
			/* webpackChunkName: "view-[request]" */ `@/features/${featureName}/ui/views/${path}.vue`
		);
}

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: importView("shared", "RootView"),
			beforeEnter: AuthenticatedOnlyGuard,
			children: [
				...HomeRoutes,
				...UnitsRoute,
				...AccountsRoute,
				...BlueprintsRoutes
			]
		},
		...AuthRoutes
	] as Array<RouteRecordRaw>
});

export default router;
