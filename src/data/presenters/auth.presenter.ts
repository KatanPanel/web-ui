import { User } from "@/domain/models/user/user.model";
import authService, {
	AUTHORIZATION_TOKEN_KEY,
} from "@/data/services/auth.service";
import { getModule } from "vuex-module-decorators";
import UserStore from "@/native/store/user/user.store";
import { AccessToken } from "@/domain/models/auth/access-token.model";
import localStorageService from "@/data/services/local-storage.service";
import { isNull } from "@/utils";

class AuthPresenter {
	get isLoggedIn(): boolean {
		return getModule(UserStore).isLoggedIn;
	}

	async login(username: string, password: string): Promise<AccessToken> {
		return authService.login(username, password);
	}

	async verify(): Promise<User> {
		const accessToken = localStorageService.get<AccessToken | null>(
			AUTHORIZATION_TOKEN_KEY
		);
		if (isNull(accessToken)) throw new Error("Access token not found");

		return authService.verify(accessToken.token);
	}
}

export default new AuthPresenter();
