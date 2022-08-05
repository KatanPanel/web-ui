import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AuthRoutes } from "@/native/routes/auth/auth.routes";
import { HomeRoutes } from "@/native/routes/home/home.routes";
import {
	loadLocaleMessages,
	setI18nLanguage,
	SUPPORT_LOCALES,
} from "@/native/i18n";
import { i18n } from "@/main";
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
		...UnitsRoutes,
	] as Array<RouteRecordRaw>,
});

// router.beforeEach(async (to, from, next) => {
// 	const paramsLocale = to.params.locale as string;
// 	if (!SUPPORT_LOCALES.includes(paramsLocale)) {
// 		return next();
// 	}
//
// 	if (!i18n.global.availableLocales.includes(paramsLocale)) {
// 		await loadLocaleMessages(i18n, paramsLocale);
// 	}
//
// 	setI18nLanguage(i18n, paramsLocale);
// 	return next();
// });

export default router;
