import Vue from "vue";
import { ActionContext, ActionTree } from "vuex";
import { AppState } from "@/store/state";
import { PanelState } from "@/store/panel/state";
import { AxiosResponse } from "axios";
import { ON_PANEL_JOIN, ON_PANEL_SERVER_SET } from "@/store/panel/mutations";

export const JOIN_PANEL = "joinPanel";
export const PANEL_SET_SERVER = "setServer";

const vm: Vue = Vue.prototype;
export default {
	[JOIN_PANEL](ctx: ActionContext<PanelState, AppState>): Promise<void> {
		return vm
			.$http({
				url: `/servers`,
				method: "get",
				withCredentials: true,
			})
			.then((res: AxiosResponse) => {
				ctx.commit(ON_PANEL_JOIN, {
					serverList: res.data.data,
				});
			});
	},
	[PANEL_SET_SERVER](
		ctx: ActionContext<PanelState, AppState>,
		payload: {
			serverId: string;
		}
	): Promise<void> {
		return vm
			.$http({
				url: `/servers/${payload.serverId}`,
				method: "get",
				withCredentials: true,
			})
			.then((res: AxiosResponse) => {
				ctx.commit(ON_PANEL_SERVER_SET, {
					server: res.data.data.server,
				});
			});
	},
} as ActionTree<PanelState, AppState>;
