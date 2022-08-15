import { Account } from "@/features/account/models/account.model";
import authGateway from "@/features/auth/data/auth.gateway";
import httpService from "@/features/shared/data/http.service";
import localStorageService from "@/features/shared/data/local-storage.service";
import { AccessToken } from "@/features/auth/models/access-token.model";
import { isUndefined } from "@/utils";

export const AUTHORIZATION_TOKEN_KEY = "token";

class AuthService {
	async login(username: string, password: string): Promise<AccessToken> {
		return authGateway.login(username, password).then((accessToken) => {
			httpService.defaults().headers.common.Authorization = `Bearer ${accessToken.token}`;
			localStorageService.set(AUTHORIZATION_TOKEN_KEY, {
				token: accessToken.token
			} as AccessToken);
			return accessToken;
		});
	}

	async verify(accessToken: string): Promise<Account> {
		return authGateway.verify(accessToken).then((response) => {
			const lastLoggedInAt = response["last-logged-in-at"];

			return {
				id: response.id,
				username: response.username,
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
