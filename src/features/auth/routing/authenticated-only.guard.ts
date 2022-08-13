import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocationNormalized
} from "vue-router";
import authPresenter from "@/features/auth/ui/auth.presenter";
import { AUTH_LOGIN_ROUTE } from "@/features/auth/routing/auth.routes";

export const AuthenticatedOnlyGuard: NavigationGuard = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	if (authPresenter.isLoggedIn) return next();

	authPresenter
		.verify()
		.then(() => next())
		.catch((error: Error) => next({ name: AUTH_LOGIN_ROUTE }));
};
