import { ModuleRouting } from "@/di";
import { AuthenticatedOnlyGuard } from "@/app/auth/guards/authenticated-only.guard";
import { AUTH_LOGIN } from "@/routes";
import AuthLogin from "@/app/auth/views/AuthLogin.vue";

export const AuthRouter: ModuleRouting = {
	path: "/auth",
	root: true,
	component: "AuthMain",
	children: [
		{
			path: "/login",
			name: AUTH_LOGIN,
			component: "AuthLogin"
		},
		{
			path: "continue",
			name: "auth.continue",
			component: "AuthContinue",
			beforeEnter: AuthenticatedOnlyGuard
		},
		{
			path: "logout",
			name: "auth.logout",
			component: "AuthLogout"
		}
	]
};
