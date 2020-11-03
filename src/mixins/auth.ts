import Vue from "vue";
import Component from "vue-class-component";
import { AUTH_MODULE } from "@/store";
import { GET_AUTH_ACCOUNT, IS_AUTHENTICATED } from "@/store/auth/getters";
import { joinVuexModule } from "@/utils/text";

@Component
export class AuthMixin extends Vue {
	public get getAccount(): any {
		return this.$store.getters[
			joinVuexModule(AUTH_MODULE, GET_AUTH_ACCOUNT)
		];
	}

	public get isLoggedIn(): boolean {
		return this.$store.getters[
			joinVuexModule(AUTH_MODULE, IS_AUTHENTICATED)
		];
	}
}
