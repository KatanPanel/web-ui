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

import { isNumber } from "@/common/utils/any";

export const WEBSOCKET_OPEN = "open";
export const WEBSOCKET_CLOSE = "close";
export const WEBSOCKET_ERROR = "error";
export const WEBSOCKET_MESSAGE = "message";

export class RawWebSocket {
	public native!: WebSocket;
	private readonly listeners = new Map<string, Function[]>();

	/**
	 * Sends data to the server's WebSocket channel immediately if it is open
	 * or waiting until a connection is established to send.
	 * @param {number} op - the operation code of the message.
	 * @param {*} data - the content of the message.
	 */
	public send(op: number, data: any): void {
		const payload = { op, d: data };

		// send immediately if already connected
		if (this.native.readyState === WebSocket.OPEN)
			return this.sendImmediately(payload);
		this.on(WEBSOCKET_OPEN, () => this.sendImmediately(payload));
	}

	/**
	 * Registers a listener that will be called until the operation or event code occurs.
	 * If an operation code is given, the listener will only be called
	 * if there is an active connection and/or waiting until a connection is established.
	 * @param {string | number} eventOrOp - event or operation code.
	 * @param {Function} handler - the listener.
	 */
	public on(eventOrOp: string | number, handler: Function): void {
		// fast path -- operation code handling
		if (isNumber(eventOrOp)) {
			return this.on(WEBSOCKET_MESSAGE, (message: any) => {
				if (!message.op || message.op !== eventOrOp) return;
				handler(message.d);
			});
		}

		// fast path -- the event is the WEBSOCKET_OPEN event and the connection is already open
		if (
			eventOrOp === WEBSOCKET_OPEN &&
			this.native.readyState === WebSocket.OPEN
		)
			return handler();

		const event = eventOrOp as string;
		if (this.listeners.has(event)) this.listeners.get(event)?.push(handler);
		else this.listeners.set(event, [handler]);
	}

	/**
	 * Calls all registered listeners for the specified event.
	 * @param {string} type - the event.
	 * @param {...*} parameters - handler parameters.
	 */
	public call(type: string, ...parameters: any[]): void {
		if (!this.listeners.has(type)) return;
		for (const fn of this.listeners.get(type) as Function[]) {
			fn(...parameters);
		}
	}

	/**
	 * Immediately sends data to the server's WebSocket channel ignoring the fact that it is closed or open.
	 * @param {*} data - the payload.
	 * @private
	 */
	private sendImmediately(data: any): void {
		this.native?.send(JSON.stringify(data));
	}
}
