import { MutationTree } from "vuex";
import { PanelState } from "@/store/panel/state";

export const ON_PANEL_JOIN = "onPanelJoin";
export const ON_PANEL_SERVER_SET = "onPanelServerSet";

export default {
	[ON_PANEL_JOIN](state: PanelState, payload: { serverList: any[] | null }) {
		state.serverList = payload.serverList;
	},
	[ON_PANEL_SERVER_SET](state: PanelState, payload: { server: any | null }) {
		state.currentServer = payload.server;
	},
} as MutationTree<PanelState>;
