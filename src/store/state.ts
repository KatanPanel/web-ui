export const DEFAULT_THEME = "default";
export const DARK_THEME = "dark";

export interface AppState {
	socket: AppStateWebsocket;
	language: AppLanguage | null;
	theme: string;
}

export type AppLanguage = {
	name: string;
	tag: string;
};

export type AppStateWebsocket = WebSocket & {
	isConnected: boolean;
};

export default {
	socket: {
		isConnected: false,
	},
	language: null,
	theme: DEFAULT_THEME,
} as AppState;
