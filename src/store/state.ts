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

import { commit } from "@/common/utils/vuex";
import { ROOT_MODULE } from "@/store/index";
import { ON_SOCKET_LISTENER_ADD } from "@/store/mutations";
import { Window } from "@/common/navigation/window";
import { Route } from "vue-router";

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export interface RootState {
	socket: RootWebSocketState;
	language: Language | null;
	theme: string;
	serverList: any[] | null;
	serverInfo: any;
	allWindows: Array<Window>;
	navigationHistory: Array<Route>;
}

export type Language = {
	name: string;
	tag: string;
};

export class RootWebSocketState {
	public native!: WebSocket;
	public isConnected = false;
	public readonly listeners: Map<string, Function[]> = new Map();

	public sendMessage(object: any): void {
		if (this.isConnected) this.sendMessageImmediate(object);
		else
			this.on("connect", () => {
				this.sendMessageImmediate(object);
			});
	}

	private sendMessageImmediate(object: any): void {
		this.native?.send(JSON.stringify(object));
	}

	public sendOp(op: number, data: any): void {
		this.sendMessage({
			op,
			d: data,
		});
	}

	public on(event: string, listener: Function): void {
		if (this.isConnected) return listener();

		commit(ROOT_MODULE, ON_SOCKET_LISTENER_ADD, { event, listener });
	}

	public callListeners(type: string, ...parameters: any[]): void {
		if (!this.listeners.has(type)) return;

		for (const fn of this.listeners.get(type) as Function[]) {
			fn(...parameters);
		}
	}
}

export default {
	socket: new RootWebSocketState(),
	language: null,
	theme: LIGHT_THEME,
	serverList: null,
	serverInfo: null,
	allWindows: [],
	navigationHistory: [],
} as RootState;
