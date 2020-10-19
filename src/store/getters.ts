import { GetterTree } from "vuex";
import { AppState, AppStateWebsocket } from "@/store/state";

export const GET_SOCKET = "getSocket";

export default {
	[GET_SOCKET](state: AppState): AppStateWebsocket {
		return state.socket;
	}
} as GetterTree<AppState, AppState>