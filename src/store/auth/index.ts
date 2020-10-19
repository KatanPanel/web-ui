import {ModuleTree} from "vuex";
import state, {AuthState} from "@/store/auth/state";
import actions from "@/store/auth/actions";
import mutations from "@/store/auth/mutations";

export const AUTH_TOKEN_KEY = "token"

export default {
	actions,
	mutations,
	state,
	namespaced: true
} as ModuleTree<AuthState>