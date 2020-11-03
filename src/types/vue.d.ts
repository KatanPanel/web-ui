import { VocaStatic } from "voca";
import { AxiosInstance } from "axios";

declare module "vue/types/vue" {
	interface Vue {
		beforeCreate(): void;
		created(): void;
		beforeMount(): void;
		mounted(): void;
		$isDevelopmentMode: boolean;
		$helpers: { voca: VocaStatic };
		$socket: WebSocket;
		$http: AxiosInstance;
		$connect(): void;
		$disconnect(): void;
	}
}

declare module "vue-router/types/router" {
	interface VueRouter {
		redirect(to: string): void;
	}
}
