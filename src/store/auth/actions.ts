import Vue from "vue";
import { ActionContext, ActionTree, Store } from "vuex";
import { AuthState } from "@/store/auth/state";
import { AppState } from "@/store/state";
import { AxiosError, AxiosResponse } from "axios";
import { ON_AUTH_LOGIN } from "@/store/auth/mutations";

export const AUTH_LOGIN = "login";
export const AUTH_VERIFY = "verify";

const vm: Vue = Vue.prototype;
export default {
	[AUTH_LOGIN](
		ctx: ActionContext<AuthState, AppState>,
		payload: {
			username: string;
			password: string;
		}
	): Promise<{ token: string }> {
		return vm
			.$http({
				url: "/auth/login",
				method: "post",
				withCredentials: true,
				data: payload,
			})
			.then((res: AxiosResponse) => {
				const token = res.data.data.token;
				ctx.commit(ON_AUTH_LOGIN, { token });
				return token;
			})
			.catch((err: AxiosError) => {
				// undefined response, it can happen in case of CORS
				if (typeof err.response === "undefined") return;

				throw err;
			});
	},
	[AUTH_VERIFY](
		ctx: ActionContext<AuthState, AppState>,
		payload: {
			token: string;
		}
	): Promise<void> {
		return vm
			.$http({
				url: "/auth/verify",
				method: "get",
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			})
			.then((res: AxiosResponse) => {
				console.log("bearer token: " + payload.token);
				console.log(AUTH_VERIFY, res.data);
			});
	},
} as ActionTree<AuthState, AppState>;
