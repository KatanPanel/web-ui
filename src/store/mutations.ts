import { MutationTree } from "vuex";
import { AppLanguage, AppState } from "@/store/state";

export const SOCKET_ONOPEN = "onSocketConnect";
export const SOCKET_ONCLOSE = "onSocketDisconnect";
export const SOCKET_ONERROR = "onSocketError";
export const LANGUAGE_CHANGE = "onLanguageChange";

export default {
	[SOCKET_ONOPEN](state: AppState, event: Event) {
		const client = event.currentTarget as WebSocket;
		console.log("open");
		state.socket = Object.assign(client, {
			isConnected: true,
		});
	},
	[SOCKET_ONCLOSE](state: AppState) {
		state.socket.isConnected = false;
		console.log("close");
	},
	[SOCKET_ONERROR](state: AppState, event: Event) {
		console.error(state, event);
	},
	[LANGUAGE_CHANGE](
		state: AppState,
		payload: {
			language: AppLanguage;
		}
	) {
		state.language = payload.language;
		console.log("locale changed to", state.language);
	},
} as MutationTree<AppState>;
