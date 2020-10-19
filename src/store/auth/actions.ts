import Vue from "vue";
import {ActionContext, ActionTree, Store} from "vuex";
import {AuthState} from "@/store/auth/state";
import {AppState} from "@/store/state";
import {AxiosError, AxiosResponse} from "axios";
import {ON_LOGIN} from "@/store/auth/mutations";

export const AUTH_LOGIN = "login";
export const AUTH_VERIFY = "verify";

const vm: Vue = Vue.prototype;
export default {
	[AUTH_LOGIN](
		this: Store<AppState>,
		ctx: ActionContext<AuthState, AppState>,
		payload: {
			username: string;
			password: string;
		}
	): Promise<{ token: string }> {
		return vm.$http({
			url: "/auth/login",
			method: "post",
			withCredentials: true,
			data: payload
		})
			.then((res: AxiosResponse) => {
				const token = res.data.data.token;
				ctx.commit(ON_LOGIN, {token});
				return token;
			})
			.catch((err: AxiosError) => {
				// undefined response, it can happen in case of CORS
				if (typeof err.response === "undefined")
					return;

				throw err;
			});
	},
	[AUTH_VERIFY](
		this: Store<AppState>,
		ctx: ActionContext<AuthState, AppState>
	): Promise<void> {
		return vm.$http({
			url: "/auth/verify",
			method: "get",
			headers: {
				"Authorization": `Bearer ${ctx.state.token}`
			}
		}).then((res: AxiosResponse) => {
			console.log(AUTH_VERIFY, res);
		}).catch((err: AxiosError) => {
			console.log(AUTH_VERIFY, err.response);
		})
	}
} as ActionTree<AuthState, AppState>;
