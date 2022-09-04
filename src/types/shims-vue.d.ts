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
		beforeCreate(this: ComponentPublicInstance): void;
		created(this: ComponentPublicInstance): void;
		mounted(this: ComponentPublicInstance): void;
		beforeMount(this: ComponentPublicInstance): void;
		beforeUnmount(this: ComponentPublicInstance): void;
		destroyed(): void;
	}
}
