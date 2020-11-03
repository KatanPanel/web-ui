import { ModuleTree } from "vuex";
import state, { AuthState } from "@/store/auth/state";
import actions from "@/store/auth/actions";
import mutations from "@/store/auth/mutations";
import getters from "@/store/auth/getters";

export const AUTH_TOKEN_KEY = "token";

export default {
	actions,
	mutations,
	state,
	getters,
	namespaced: true,
} as ModuleTree<AuthState>;
