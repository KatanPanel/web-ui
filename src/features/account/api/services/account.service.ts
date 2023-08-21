import { Account } from "@/features/account/api/models/account.model";
import AccountStore from "@/features/account/account.store";
import { getModule } from "vuex-module-decorators";
import { AccessToken } from "@/features/auth/api/models/access-token.model";
import authService from "@/features/auth/api/services/auth.service";

class AccountService {

	private dataStore(): AccountStore {
		return getModule(AccountStore)
	}

	get isLoggedIn(): boolean {
		return this.dataStore().isLoggedIn
	}

	async updateAccount(account: Account) {
		this.dataStore().updateAccount({ account })
	}

	async retrieveAccount(accessToken: AccessToken) {
		return authService.verify(accessToken)
			.then((account: Account) => this.updateAccount(account))
	}
}

export default new AccountService()
