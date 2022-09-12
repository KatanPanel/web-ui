import { isUndefined } from "@/utils";
import logService from "@/features/shared/data/log.service";
import configService from "@/features/shared/data/config.service";

export type WebSocketMessage = { o: number; d?: unknown };

class WebSocketService {
	private ws?: WebSocket;
	private logger = logService.copy("Gateway");

	tryConnect(onConnect: () => void, onFailure?: () => void): void {
		if (this.isConnected()) return;

		const url = configService.gatewayUrl;
		this.logger.debug("Connecting to", url);
		this.ws = new WebSocket(url);

		const start = performance.now();
		this.ws.onopen = () => {
			const end = performance.now();
			this.logger.debug(`Connected in ${end - start}ms`);
			onConnect();
		};
		this.ws.onerror = () => {
			onFailure?.();
		};
		this.ws.onmessage = (e: MessageEvent) => {
			console.log("received", e.data);
		};
	}

	async send(message: WebSocketMessage): Promise<void> {
		if (isUndefined(this.ws) || this.ws.readyState !== WebSocket.OPEN) {
			this.logger.debug(
				"Waiting connection be established to send message..."
			);
			await this.awaitConnect();
		}

		this.ws?.send(JSON.stringify(message));
		this.logger.debug("Sent", message);
	}

	awaitConnect(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.isConnected()) return resolve();

			this.tryConnect(resolve, reject);
		});
	}

	isConnected(): boolean {
		return !isUndefined(this.ws) && this.ws.readyState === WebSocket.OPEN;
	}

	close(): void {
		this.ws?.close(1000);
		this.ws = undefined;
	}
}

export default new WebSocketService();
