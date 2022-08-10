// eslint-disable-next-line @typescript-eslint/no-unused-vars
// noinspection ES6UnusedImports
import Vue from "vue";
import { User } from "@/domain/models/user/user.model";

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$isDevelopmentMode: boolean;
		$katan: {
			getUser: () => User;
		};
	}
}
