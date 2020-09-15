import Vue from "vue";
import { MutationTree } from "vuex";
import { AppState } from "@/store/state";

export const SOCKET_ONOPEN = 'Socket connected';
export const SOCKET_ONCLOSE = 'Socket disconnected';
export const SOCKET_ONERROR = 'Socket error'

export const socketMutations = {
	SOCKET_ONOPEN,
	SOCKET_ONCLOSE,
	SOCKET_ONERROR
}

export default {
	[SOCKET_ONOPEN](state: AppState, event: Event) {
		const client = event.currentTarget as WebSocket
		Vue.prototype.$socket = client
		state.socket = Object.assign(client, {
			isConnected: true
		})
	},
	[SOCKET_ONCLOSE](state: AppState) {
		state.socket.isConnected = false
	},
	[SOCKET_ONERROR](state: AppState, event: Event) {
		console.error(state, event)
	}
} as MutationTree<AppState>