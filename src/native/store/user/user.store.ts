import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Account } from "@/domain/models/account/account.model";
import appStore from "@/native/store/app.store";
import { isNull } from "@/utils";

@Module({
	name: "user",
	namespaced: true,
	dynamic: true,
	store: appStore
})
export default class UserStore extends VuexModule {
	private _user: Account | null = null;

	/**
	 * Returns the account who is currently logged in.
	 */
	public get getUser(): Account {
		if (this._user == null) throw new Error("Cannot retrieve null account");

		return this._user;
	}

	public get isLoggedIn() {
		return !isNull(this._user);
	}

	@Mutation
	public updateUser(payload: { user: Account }): void {
		this._user = payload.user;
	}
}
