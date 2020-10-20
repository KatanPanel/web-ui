import { AuthState } from "@/store/auth/state";
import { MutationTree } from "vuex";

export const ON_AUTH_LOGIN = "onLogin";

export default {
	[ON_AUTH_LOGIN](state: AuthState, payload: { token: string }) {
		state.token = payload.token;
	},
} as MutationTree<AuthState>;
