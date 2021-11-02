/*
 * Copyright (c) 2020-present Katan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { injectable } from "inversify";
import { inject } from "inversify-props";
import { ConfigService } from "@/app/shared/services/config.service";
import { LoggingService } from "@/app/shared/services/logging.service";
import { NativeWebSocketClient } from "@/app/app-network/utils/websocket-client";
import { isUndefined } from "@/app/shared/utils";

@injectable()
export class WebSocketService {
	private readonly client!: NativeWebSocketClient;

	constructor(
		@inject() loggingService: LoggingService,
		@inject() private readonly configService: ConfigService
	) {
		this.client = new NativeWebSocketClient(
			loggingService.copy(WebSocketService.name)
		);
	}

	public get state(): number {
		return this.client?.state || WebSocket.CLOSED;
	}

	public connect(): void {
		if (!isUndefined(this.client)) this.client.close();
		this.client.connect(this.configService.wsUrl);
	}

	public close() {
		if (isUndefined(this.client)) return;

		this.client.close();
	}

	public sendMessage(operationCode: number, content: any): void {
		this.client.send(operationCode, content);
	}
}
