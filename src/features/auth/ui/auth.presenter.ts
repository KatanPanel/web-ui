import { Account } from "@/features/account/models/account.model";
import authService, {
	AUTHORIZATION_TOKEN_KEY
} from "@/features/auth/data/auth.service";
import { getModule } from "vuex-module-decorators";
import AccountStore from "@/features/account/store/account.store";
import { AccessToken } from "@/features/auth/models/access-token.model";
import localStorageService from "@/features/shared/data/local-storage.service";
import { isNull } from "@/utils";

class AuthPresenter {
	get isLoggedIn(): boolean {
		return getModule(AccountStore).isLoggedIn;
	}

	async login(username: string, password: string): Promise<AccessToken> {
		return authService.login(username, password);
	}

	async verify(): Promise<Account> {
		const accessToken = localStorageService.get<AccessToken | null>(
			AUTHORIZATION_TOKEN_KEY
		);
		if (isNull(accessToken)) throw new Error("Access token not found");

		return authService.verify(accessToken.token);
	}
}

export default new AuthPresenter();
