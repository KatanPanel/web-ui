import {
	NavigationGuard,
	NavigationGuardNext,
	RouteLocationNormalized
} from "vue-router";
import { AUTH_LOGIN_ROUTE } from "@/features/auth/auth.routes";
import accountService from "@/features/account/api/services/account.service";
import localStorageService from "@/features/platform/api/local-storage.service";
import { AccessToken } from "@/features/auth/api/models/access-token.model";
import authService, {
	AUTHORIZATION_TOKEN_KEY
} from "@/features/auth/api/services/auth.service";
import { isNull } from "@/utils";
import { Account } from "@/features/account/api/models/account.model";
import logService from "@/features/platform/api/log.service";

export const AuthenticatedOnlyGuard: NavigationGuard = (
	_to: RouteLocationNormalized,
	_from: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	if (accountService.isLoggedIn) return next();

	const localToken = authService.getLocalAccessToken()
	if (isNull(localToken)) return next({ name: AUTH_LOGIN_ROUTE });

	authService
		.verify(localToken!)
		.then(
			(account: Account) => accountService.updateAccount(account),
			(error: Error) => {
				logService.debug(`Unable to verify local token`, error);
				next({ name: AUTH_LOGIN_ROUTE });
			}
		)
		.then(next);
};
