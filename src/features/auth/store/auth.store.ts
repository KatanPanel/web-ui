import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import appStore from "@/store";

@Module({
	name: "auth",
	namespaced: true,
	dynamic: true,
	store: appStore
})
export default class AuthStore extends VuexModule {
	private _token: string | null = null;

	/**
	 * Returns the current authorization token.
	 */
	public get getToken(): string | null {
		return this._token;
	}

	/**
	 * Updates the current authorization token
	 * @param {Object} payload - The mutation payload.
	 * @param {string} payload.token - The new token.
	 */
	@Mutation
	public updateToken(payload: { token: string | null }): void {
		this._token = payload.token;
	}
}
