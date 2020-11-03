import { ActionContext, ActionTree } from "vuex";
import {
	AppLanguage,
	AppState,
	DARK_THEME,
	DEFAULT_THEME,
} from "@/store/state";
import { ON_LANGUAGE_CHANGE, ON_THEME_CHANGE } from "@/store/mutations";

export const SET_LANGUAGE = "setLanguage";
export const SET_THEME = "setTheme";
export const SWITCH_THEME = "switchTheme";

export default {
	[SET_LANGUAGE](
		ctx: ActionContext<AppState, AppState>,
		payload: { language: AppLanguage }
	) {
		ctx.commit(ON_LANGUAGE_CHANGE, payload);
	},
	[SET_THEME](
		ctx: ActionContext<AppState, AppState>,
		payload: { theme: string }
	) {
		ctx.commit(ON_THEME_CHANGE, {
			theme: payload.theme,
		});
	},
	[SWITCH_THEME](ctx: ActionContext<AppState, AppState>) {
		let theme = ctx.state.theme;
		if (theme === DEFAULT_THEME) theme = DARK_THEME;
		else theme = DEFAULT_THEME;
		ctx.commit(ON_THEME_CHANGE, {
			theme: theme,
		});
	},
} as ActionTree<AppState, AppState>;
