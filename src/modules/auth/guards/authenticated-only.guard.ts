import type {NavigationGuard, NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import accountService from "@/modules/accounts/api/services/account.service";
import authService from "@/modules/auth/api/services/auth.service";
import {isNull} from "@/utils";
import type {Account} from "@/modules/accounts/api/models/account.model";
import logService from "@/modules/platform/api/services/log.service";
import {AUTH_LOGIN_ROUTE} from "@/modules/auth/auth.routes";

export const AuthenticatedOnlyGuard: NavigationGuard = (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    if (accountService.isLoggedIn) return next()

    const localToken = authService.getLocalAccessToken()
    if (isNull(localToken))
        return next({ name: AUTH_LOGIN_ROUTE })

    authService
        .verify(localToken!)
        .then(
            (account: Account) => accountService.updateAccount(account),
            (error: Error) => {
                logService.debug("Unable to verify local token", error)
                next({ name: AUTH_LOGIN_ROUTE })
            }
        )
        .then(next)
}
