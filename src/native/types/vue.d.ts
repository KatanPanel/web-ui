// noinspection ES6UnusedImports
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from "vue";
import ConfigService from "@/data/services/config.service";

declare module "vue/types/vue" {
	interface Vue {
		$isDevelopmentMode: boolean;
		$config: ConfigService;
	}
}
