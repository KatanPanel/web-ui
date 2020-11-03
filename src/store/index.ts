import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import state, { AppState } from "@/store/state";
import mutations from "@/store/mutations";
import AuthModule from "@/store/auth";
import PanelModule from "@/store/panel";
import actions from "@/store/actions";

Vue.use(Vuex);

export const AUTH_MODULE = "auth";
export const PANEL_MODULE = "panel";

export default new Vuex.Store<AppState>({
	state,
	mutations,
	getters,
	actions,
	modules: {
		[AUTH_MODULE]: AuthModule,
		[PANEL_MODULE]: PanelModule,
	},
	strict: process.env.NODE_ENV !== "production",
});
