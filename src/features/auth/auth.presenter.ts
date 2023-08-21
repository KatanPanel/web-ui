import { Account } from "@/features/account/api/account.model";
import authService, {
	AUTHORIZATION_TOKEN_KEY
} from "@/features/auth/api/auth.service";
import { getModule } from "vuex-module-decorators";
import AccountStore from "@/features/account/account.store";
import { AccessToken } from "@/features/auth/api/access-token.model";
import localStorageService from "@/features/platform/api/local-storage.service";
import { isNull } from "@/utils";

class AuthPresenter {
	get isLoggedIn(): boolean {
		return getModule(AccountStore).isLoggedIn;
	}

	async login(username: string, password: string): Promise<AccessToken> {
		return authService.login(username, password);
	}

	async verify(): Promise<void> {
		const accessToken = localStorageService.get<AccessToken | null>(
			AUTHORIZATION_TOKEN_KEY
		);
		if (isNull(accessToken))
			throw new Error("Access token not found in local storage");

		return authService
			.verify(accessToken.token)
			.then((account: Account) => {
				getModule(AccountStore).updateAccount({ account });
			});
	}
}

export default new AuthPresenter();
