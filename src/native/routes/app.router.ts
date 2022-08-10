import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AuthRoutes } from "@/native/routes/auth/auth.routes";
import { HomeRoutes } from "@/native/routes/home/home.routes";

export function importView(path: string): () => Promise<unknown> {
	return () =>
		import(
			/* webpackChunkName: "view-[request]" */ `@/presentation/views/${path}`
		);
}

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [...HomeRoutes, ...AuthRoutes] as Array<RouteRecordRaw>
});

export default router;
