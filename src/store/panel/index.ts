import { ModuleTree } from "vuex";
import state, { PanelState } from "@/store/panel/state";
import mutations from "@/store/panel/mutations";
import actions from "@/store/panel/actions";
import getters from "@/store/panel/getters";

export default {
	actions,
	mutations,
	state,
	getters,
	namespaced: true,
} as ModuleTree<PanelState>;
