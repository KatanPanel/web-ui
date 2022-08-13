import { Account } from "@/domain/models/account/account.model";

/* eslint-disable */
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;

	// noinspection JSUnusedGlobalSymbols
	export default component;
}

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$isDevelopmentMode: boolean;
		$katan: {
			getUser: () => Account;
		};
	}
}

