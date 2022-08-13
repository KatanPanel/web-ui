import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AuthRoutes } from "@/features/auth/routing/auth.routes";
import { HomeRoutes } from "@/features/home/routing/home.routes";
import { UnitsRoute } from "@/features/units/routing/units.routes";

export function importView(
	featureName: string,
	path: string
): () => Promise<unknown> {
	return () =>
		import(
			/* webpackChunkName: "view-[request]" */ `@/features/${featureName}/presentation/views/${path}.vue`
		);
}

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		...HomeRoutes,
		...AuthRoutes,
		...UnitsRoute
	] as Array<RouteRecordRaw>
});

export default router;
