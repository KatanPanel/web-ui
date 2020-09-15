import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import state, { AppState } from "@/store/state";
import mutations from "@/store/mutations";

Vue.use(Vuex);

export default new Vuex.Store<AppState>({
	state,
	mutations,
	getters
});
