import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AuthRoutes } from "@/native/routes/auth/auth.routes";
import { HomeRoutes } from "@/native/routes/home/home.routes";
import { UnitsRoutes } from "@/native/routes/units/units.routes";

export function importView(path: string): () => Promise<unknown> {
	return () =>
		/* webpackChunkName: "[request]" */ import(
			`@/presentation/views/${path}`
		);
}

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		...HomeRoutes,
		...AuthRoutes,
		...UnitsRoutes
	] as Array<RouteRecordRaw>
});

export default router;
