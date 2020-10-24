import { MutationTree } from "vuex";
import { AppLanguage, AppState } from "@/store/state";
import Vue from "vue";

export const SOCKET_ONOPEN = "onSocketConnect";
export const SOCKET_ONCLOSE = "onSocketDisconnect";
export const SOCKET_ONERROR = "onSocketError";
export const LANGUAGE_CHANGE = "onLanguageChange";
export const THEME_CHANGE = "onThemeChange";

export default {
	[SOCKET_ONOPEN](state: AppState, event: Event) {
		const client = event.currentTarget as WebSocket;
		state.socket = Object.assign(client, {
			isConnected: true,
		});
	},
	[SOCKET_ONCLOSE](state: AppState) {
		state.socket.isConnected = false;
	},
	[SOCKET_ONERROR](state: AppState, event: Event) {
		console.error(state, event);
	},
	[LANGUAGE_CHANGE](state: AppState, payload: { language: AppLanguage }) {
		state.language = payload.language;
	},
	[THEME_CHANGE](state: AppState, payload: { theme: string }) {
		state.theme = payload.theme;
		(Vue.prototype as Vue).$storage.set("theme", {
			theme: payload.theme,
		});
		document.querySelector("body")!.setAttribute("data-theme", state.theme);
	},
} as MutationTree<AppState>;
