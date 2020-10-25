import { MutationTree } from "vuex";
import { AppLanguage, AppState } from "@/store/state";
import Vue from "vue";

export const ON_SOCKET_OPEN = "onSocketConnect";
export const ON_SOCKET_CLOSE = "onSocketDisconnect";
export const ON_SOCKET_ERROR = "onSocketError";
export const ON_LANGUAGE_CHANGE = "onLanguageChange";
export const ON_THEME_CHANGE = "onThemeChange";

export const LANGUAGE_STORAGE_KEY = "language";
export const THEME_STORAGE_KEY = "theme";

const vm: Vue = Vue.prototype;
export default {
	[ON_SOCKET_OPEN](state: AppState, event: Event) {
		const client = event.currentTarget as WebSocket;
		state.socket = Object.assign(client, {
			isConnected: true,
		});
	},
	[ON_SOCKET_CLOSE](state: AppState) {
		state.socket.isConnected = false;
	},
	[ON_SOCKET_ERROR](state: AppState, event: Event) {
		console.error(state, event);
	},
	[ON_LANGUAGE_CHANGE](state: AppState, payload: { language: AppLanguage }) {
		state.language = payload.language;
		vm.$storage.set(LANGUAGE_STORAGE_KEY, payload.language.tag);
	},
	[ON_THEME_CHANGE](state: AppState, payload: { theme: string }) {
		state.theme = payload.theme;
		vm.$storage.set(THEME_STORAGE_KEY, payload);
		document.querySelector("body")!.setAttribute("data-theme", state.theme);
	},
} as MutationTree<AppState>;
