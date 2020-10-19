import {AuthState} from "@/store/auth/state";
import {MutationTree} from "vuex";

export const ON_LOGIN = "onLogin";

export default {
	[ON_LOGIN](state: AuthState, payload: { token?: string }) {
		state.token = payload.token
	}
} as MutationTree<AuthState>