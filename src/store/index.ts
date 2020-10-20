import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import state, { AppState } from "@/store/state";
import mutations from "@/store/mutations";
import AuthModule from "@/store/auth";
import actions from "@/store/actions";

Vue.use(Vuex);

export const AUTH_MODULE = "auth";

export default new Vuex.Store<AppState>({
	state,
	mutations,
	getters,
	actions,
	modules: {
		[AUTH_MODULE]: AuthModule,
	},
});
