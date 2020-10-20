import { ActionContext, ActionTree } from "vuex";
import { AppLanguage, AppState } from "@/store/state";
import { LANGUAGE_CHANGE } from "@/store/mutations";

export const SET_LANGUAGE = "setLanguage";

export default {
	[SET_LANGUAGE](
		ctx: ActionContext<AppState, AppState>,
		payload: {
			language: AppLanguage;
		}
	) {
		ctx.commit(LANGUAGE_CHANGE, payload);
	},
} as ActionTree<AppState, AppState>;
