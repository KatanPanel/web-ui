import { Account } from "@/features/account/models/account.model";
import { ComponentPublicInstance } from "vue";

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
		created(this: ComponentPublicInstance): void
	}
}
