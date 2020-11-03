import { GetterTree } from "vuex";
import { AuthState } from "@/store/auth/state";
import { AppState } from "@/store/state";

export const IS_AUTHENTICATED = "isAuthenticated";
export const GET_AUTH_ACCOUNT = "getAccount";

export default {
	[IS_AUTHENTICATED](state: AuthState): boolean {
		return !!state.account;
	},
	[GET_AUTH_ACCOUNT](state: AuthState): any {
		return state.account!;
	},
} as GetterTree<AuthState, AppState>;
