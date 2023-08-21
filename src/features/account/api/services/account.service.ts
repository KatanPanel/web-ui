import { Account } from "@/features/account/api/models/account.model";
import AccountStore from "@/features/account/account.store";
import { getModule } from "vuex-module-decorators";
import logService from "@/features/platform/api/log.service";
import { Consola } from "consola";

class AccountService {
	private readonly logger!: Consola;

	constructor() {
		this.logger = logService.create(AccountService.name);
	}

	private dataStore(): AccountStore {
		return getModule(AccountStore);
	}

	get isLoggedIn(): boolean {
		return this.dataStore().isLoggedIn;
	}

	async updateAccount(account: Account): Promise<void> {
		this.logger.debug("Account updated", account)
		this.dataStore().updateAccount({ account });
	}
}

export default new AccountService();
