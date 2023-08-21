import { Account } from "@/features/account/api/account.model";
import authGateway from "@/features/auth/api/auth.gateway";
import httpService from "@/features/platform/api/http.service";
import localStorageService from "@/features/platform/api/local-storage.service";
import { AccessToken } from "@/features/auth/api/access-token.model";
import { isUndefined } from "@/utils";

export const AUTHORIZATION_TOKEN_KEY = "token";

class AuthService {
	async login(username: string, password: string): Promise<AccessToken> {
		return authGateway.login(username, password).then((accessToken) => {
			localStorageService.set(AUTHORIZATION_TOKEN_KEY, {
				token: accessToken.token
			} as AccessToken);
			return accessToken;
		});
	}

	async verify(accessToken: string): Promise<Account> {
		return authGateway.verify(accessToken).then((response) => {
			httpService.defaults().headers.common.Authorization = `Bearer ${accessToken}`;
			const lastLoggedInAt = response["last-logged-in-at"];

			return {
				id: response.id,
				username: response.username,
				email: response.email,
				createdAt: new Date(response["created-at"]),
				updatedAt: new Date(response["updated-at"]),
				lastLoggedInAt: isUndefined(lastLoggedInAt)
					? undefined
					: new Date(lastLoggedInAt)
			} as Account;
		});
	}
}

export default new AuthService();
