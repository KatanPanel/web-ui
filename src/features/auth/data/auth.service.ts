import { Account } from "@/features/account/models/account.model";
import authGateway from "@/features/auth/data/auth.gateway";
import httpService from "@/features/shared/data/http.service";
import localStorageService from "@/features/shared/data/local-storage.service";
import { AccessToken } from "@/features/auth/models/access-token.model";

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
		return authGateway.verify(accessToken);
	}
}

export default new AuthService();
