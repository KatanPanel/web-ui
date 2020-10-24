import { ActionContext, ActionTree } from "vuex";
import {
	AppLanguage,
	AppState,
	DARK_THEME,
	DEFAULT_THEME,
} from "@/store/state";
import { LANGUAGE_CHANGE, THEME_CHANGE } from "@/store/mutations";

export const SET_LANGUAGE = "setLanguage";
export const SET_THEME = "setTheme";
export const SWITCH_THEME = "switchTheme";

export default {
	[SET_LANGUAGE](
		ctx: ActionContext<AppState, AppState>,
		payload: { language: AppLanguage }
	) {
		ctx.commit(LANGUAGE_CHANGE, payload);
	},
	[SET_THEME](
		ctx: ActionContext<AppState, AppState>,
		payload: {
			theme: string;
		}
	) {
		ctx.commit(THEME_CHANGE, payload);
	},
	[SWITCH_THEME](ctx: ActionContext<AppState, AppState>) {
		const current = ctx.state.theme;
		ctx.commit(THEME_CHANGE, {
			theme: current !== DARK_THEME ? DARK_THEME : DEFAULT_THEME,
		});
	},
} as ActionTree<AppState, AppState>;
