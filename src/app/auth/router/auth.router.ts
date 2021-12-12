import { ModuleRouting } from "@/di";
import { AuthenticatedOnlyGuard } from "@/app/auth/guards/authenticated-only.guard";

export const AuthRouter: ModuleRouting = {
	path: "/auth",
	root: true,
	component: "AuthMain",
	children: [
		{
			path: "/login",
			name: "auth.login",
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
