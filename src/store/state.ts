export interface AppState {
	socket: AppStateWebsocket;
	language: AppLanguage | null;
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
} as AppState;
