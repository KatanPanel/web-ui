import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Account } from "@/features/account/api/models/account.model";
import appStore from "@/store";
import { isNull } from "@/utils";

@Module({
	name: "account",
	namespaced: true,
	dynamic: true,
	store: appStore
})
export default class AccountStore extends VuexModule {
	private _account: Account | null = null;

	/**
	 * Returns the account who is currently logged in.
	 */
	get getAccount(): Account {
		if (this._account == null)
			throw new Error("Cannot retrieve null account");

		return this._account;
	}

	get isLoggedIn() {
		return !isNull(this._account);
	}

	@Mutation
	updateAccount(payload: { account: Account }): void {
		this._account = payload.account;
	}
}
