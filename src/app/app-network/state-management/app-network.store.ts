import { LoggingService } from "@/app/shared/services/logging.service";
import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { NativeWebSocketClient } from "@/app/app-network/utils/websocket-client";
import { isUndefined } from "@/app/shared/utils";

@Module({ name: "app-websocket", namespaced: true })
export class AppNetworkStore extends VuexModule {
	private _websocket!: NativeWebSocketClient;

	public get getWebsocket(): NativeWebSocketClient {
		return this._websocket;
	}

	/**
	 * Attempts to establish a WebSocket connection at the given url.
	 * @param {string} url - The WebSocket server endpoint.
	 */
	@Mutation
	public connect(url: string, loggingService: LoggingService): void {
		if (
			!isUndefined(this._websocket) &&
			(this._websocket.state === WebSocket.OPEN ||
				this._websocket.state === WebSocket.CONNECTING)
		)
			throw new Error("Already connecting");

		const ws = new NativeWebSocketClient(loggingService.copy("Network"));
		ws.connect(url);
		this._websocket = ws;
	}

	/**
	 * Closes the current WebSocket connection.
	 */
	@Mutation
	public close(): void {
		if (isUndefined(this._websocket)) return;

		this._websocket.close();
	}

	/**
	 * Sets the current Websocket to the given payload object value.
	 * @param {Object} payload - The mutation payload.
	 * @param {WebSocket2} payload.websocket - The Websocket object.
	 */
	@Mutation
	public setWebsocket(payload: { websocket: NativeWebSocketClient }): void {
		this._websocket = payload.websocket;
	}
}
