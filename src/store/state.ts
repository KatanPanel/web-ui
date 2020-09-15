export interface AppState {
	socket: AppStateWebsocket;
}

export type AppStateWebsocket = WebSocket & {
	isConnected: boolean;
}

export default {
	socket: {
		isConnected: false
	}
} as AppState