import { VocaStatic } from "voca";
import { AxiosInstance } from "axios";

declare module "vue/types/vue" {

	interface Vue {
		$helpers: { voca: VocaStatic };
		$socket: WebSocket;
		$http: AxiosInstance;
		// start: Vue Native Websocket
		$connect(): void;
		$disconnect(): void;
		// end: Vue Native Websocket
	}

}

declare module "vue-router/types/router" {

	interface VueRouter {

		redirect(to: string): void;

	}

}