import { User } from "@/domain/models/user/user.model";
import { getModule } from "vuex-module-decorators";
import UserStore from "@/native/store/user/user.store";
import authGateway from "@/data/gateway/auth.gateway";
import httpService from "@/data/services/http.service";
import localStorageService from "@/data/services/local-storage.service";
import { AccessToken } from "@/domain/models/auth/access-token.model";
import logService from "@/data/services/log.service";

export const AUTHORIZATION_TOKEN_KEY = "token";

class AuthService {
	get isLoggedIn(): boolean {
		return getModule(UserStore).isLoggedIn;
	}

	async login(username: string, password: string): Promise<AccessToken> {
		return authGateway.login(username, password).then((accessToken) => {
			httpService.defaults().headers.common.Authorization = `Bearer ${accessToken.token}`;
			localStorageService.set(AUTHORIZATION_TOKEN_KEY, {
				token: accessToken.token,
			} as AccessToken);
			return accessToken;
		});
	}

	async verify(accessToken: string): Promise<User> {
		return authGateway.verify(accessToken).then((user: User) => {
			getModule(UserStore).updateUser({ user });
			return user;
		});
	}
}

export default new AuthService();
