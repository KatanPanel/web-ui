import { isUndefined } from "@/utils";
import logService from "@/features/shared/data/log.service";
import configService from "@/features/shared/data/config.service";

class WebSocketService {
	private ws?: WebSocket;
	private logger = logService.copy("Gateway");

	tryConnect(onConnect: () => void): void {
		if (!isUndefined(this.ws)) return;

		const url = configService.gatewayUrl;
		this.logger.debug("Connecting to", url);
		this.ws = new WebSocket(url);

		const start = performance.now();
		this.ws.onopen = () => {
			const end = performance.now();
			this.logger.debug(`Connected in ${end - start}ms`);
			onConnect();
		};
	}

	send(message: object): void {
		if (isUndefined(this.ws) || this.ws.readyState !== WebSocket.OPEN)
			throw new Error("Gateway not connected");

		this.ws?.send(JSON.stringify(message));
	}

	close(): void {
		this.ws = undefined;
	}
}

export default new WebSocketService();
