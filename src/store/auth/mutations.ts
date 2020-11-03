import { AuthState } from "@/store/auth/state";
import { MutationTree } from "vuex";

export const ON_AUTH_LOGIN = "onAuthLogin";
export const ON_AUTH_COMPLETE = "onAuthComplete";

export default {
	[ON_AUTH_LOGIN](state: AuthState, payload: { token: string }) {
		state.token = payload.token;
	},
	[ON_AUTH_COMPLETE](state: AuthState, payload: { account: any }) {
		state.account = payload.account;
	},
} as MutationTree<AuthState>;
