import { User } from "@/domain/models/user/user.model";

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
			getUser: () => User;
		};
	}
}

