import { GetterTree } from "vuex";
import { AppState } from "@/store/state";
import { PanelState } from "@/store/panel/state";

export const GET_PANEL_CURRENT_SERVER = "getServer";
export const GET_PANEL_SERVER_LIST = "getServerList";

export default {
	[GET_PANEL_CURRENT_SERVER](state: PanelState): any | null {
		return state.currentServer;
	},
	[GET_PANEL_SERVER_LIST](state: PanelState): any[] | null {
		return state.serverList;
	},
} as GetterTree<PanelState, AppState>;
