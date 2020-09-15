import { GetterTree } from "vuex";
import { AppState, AppStateWebsocket } from "@/store/state";

export default {
	getSocket(state: AppState): AppStateWebsocket {
		return state.socket;
	}
} as GetterTree<AppState, AppState>