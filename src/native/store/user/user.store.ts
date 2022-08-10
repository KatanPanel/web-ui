import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { User } from "@/domain/models/user/user.model";
import appStore from "@/native/store/app.store";
import { isNull } from "@/utils";

@Module({
	name: "user",
	namespaced: true,
	dynamic: true,
	store: appStore
})
export default class UserStore extends VuexModule {
	private _user: User | null = null;

	/**
	 * Returns the user who is currently logged in.
	 */
	public get getUser(): User {
		if (this._user == null) throw new Error("Cannot retrieve null user");

		return this._user;
	}

	public get isLoggedIn() {
		return !isNull(this._user);
	}

	@Mutation
	public updateUser(payload: { user: User }): void {
		this._user = payload.user;
	}
}
