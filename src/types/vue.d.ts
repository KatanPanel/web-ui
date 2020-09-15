import Vue from "vue";
import { VocaStatic } from "voca";
import { AxiosInstance } from "axios";

declare module "vue/types/vue" {

	interface Vue {
		$helpers: { voca: VocaStatic };
		$socket: WebSocket;
		$connect(): void; // native websocket
		$disconnect(): void; // native websocket
		$axios: AxiosInstance;
	}

}