import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocationNormalized
} from "vue-router";
import authPresenter from "@/data/presenters/auth.presenter";
import { AUTH_LOGIN_ROUTE } from "@/native/routes/auth/auth.routes";
import logService from "@/data/services/log.service";

export const AuthenticatedOnlyGuard: NavigationGuard = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	if (authPresenter.isLoggedIn) return next();

	authPresenter
		.verify()
		.then(() => next())
		.catch((error: Error) => {
			logService.error(error);
			next({ name: AUTH_LOGIN_ROUTE });
		});
};
