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

import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { WebSocket2 } from "@/app/app-websocket/utils/websocket";
import { isUndefined } from "@/app/shared/utils";

@Module({ name: "app-websocket", namespaced: true })
export class AppWebsocketStore extends VuexModule {
	private _websocket!: WebSocket2;

	public get getWebsocket(): WebSocket2 {
		return this._websocket;
	}

	/**
	 * Attempts to establish a WebSocket connection at the given url.
	 * @param {string} url - The WebSocket server endpoint.
	 */
	@Mutation
	public connect(url: string): void {
		if (
			!isUndefined(this._websocket) &&
			(this._websocket.state === WebSocket.OPEN ||
				this._websocket.state === WebSocket.CONNECTING)
		)
			throw new Error("Already connecting");

		const ws = new WebSocket2();
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
	public setWebsocket(payload: { websocket: WebSocket2 }): void {
		this._websocket = payload.websocket;
	}
}
