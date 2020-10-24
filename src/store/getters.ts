import { GetterTree } from "vuex";
import { AppLanguage, AppState, AppStateWebsocket } from "@/store/state";

export const GET_SOCKET = "getSocket";
export const GET_LANGUAGE = "getLanguage";
export const GET_THEME = "getTheme";

export default {
	[GET_SOCKET](state: AppState): AppStateWebsocket {
		return state.socket;
	},
	[GET_LANGUAGE](state: AppState): AppLanguage {
		return state.language!;
	},
	[GET_THEME](state: AppState): string {
		return state.theme;
	},
} as GetterTree<AppState, AppState>;
