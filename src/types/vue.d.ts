import Vue from "vue";
import { VocaStatic } from "voca";

declare module "vue/types/vue" {

	interface Vue {
		$helpers: {
			voca: VocaStatic;
		};

		// Vue Native Websocket
		$socket: WebSocket;
		$connect(): void;
		$disconnect(): void;
	}

}