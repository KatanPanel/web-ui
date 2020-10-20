import { GetterTree } from "vuex";
import { AuthState } from "@/store/auth/state";
import { AppState } from "@/store/state";

export const IS_AUTHENTICATED = "isAuthenticated";

export default {
	[IS_AUTHENTICATED](state: AuthState) {
		return typeof state.token !== "undefined";
	},
} as GetterTree<AuthState, AppState>;
