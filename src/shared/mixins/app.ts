/*
 * Copyright (c) 2020-present Katan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* import Vue from "vue";
import Component from "vue-class-component";
import { DARK_THEME, Language, LIGHT_THEME } from "@/store/state";
import { GET_BACKEND_INFO, GET_LANGUAGE, GET_THEME } from "@/store/getters";
import { loadLanguage } from "@/i18n";
import { dispatch, get } from "@/common/utils/vuex";
import { ROOT_MODULE, THEME_CACHE_KEY } from "@/store";
import { supportedLanguages } from "@/supported-languages";
import { UPDATE_THEME } from "@/store/actions";
import {
	ADVANCED_SETTINGS_ROUTE,
	HOME_ROUTE,
	SERVER_CONSOLE_ROUTE,
	SERVER_FS_DISK_ROUTE,
	SERVER_FS_ROUTE,
	SERVER_ROUTE,
	SYSTEM_GAMES_ROUTE,
} from "@/router";

@Component
export class AppMixin extends Vue {
	protected readonly HOME_ROUTE = HOME_ROUTE;
	protected readonly SYSTEM_GAMES_ROUTE = SYSTEM_GAMES_ROUTE;
	protected readonly ADVANCED_SETTINGS_ROUTE = ADVANCED_SETTINGS_ROUTE;
	protected readonly SERVER_OVERVIEW_ROUTE = SERVER_ROUTE;
	protected readonly SERVER_CONSOLE_ROUTE = SERVER_CONSOLE_ROUTE;
	protected readonly SERVER_FS_ROUTE = SERVER_FS_ROUTE;
	protected readonly SERVER_FS_DISK_ROUTE = SERVER_FS_DISK_ROUTE;

	protected get getBackendInfo(): any | null {
		return get<any | null>(ROOT_MODULE, GET_BACKEND_INFO);
	}

	protected get currentLanguage(): Language {
		return this.$store.getters[GET_LANGUAGE];
	}

	protected set currentLanguage(language: Language) {
		loadLanguage(language.tag).then();
	}

	protected get getSupportedLanguages(): Array<Language> {
		return supportedLanguages;
	}

	protected get getCurrentLanguage(): Language {
		return get<Language>(ROOT_MODULE, GET_LANGUAGE);
	}

	protected setCurrentLanguage(language: Language): void {
		loadLanguage(language.tag).then();
	}

	protected get applicationTheme(): string {
		return get<string>(ROOT_MODULE, GET_THEME);
	}

	protected set applicationTheme(theme: string) {
		dispatch(ROOT_MODULE, UPDATE_THEME, { theme }).then(() => {
			this.$storage.set(THEME_CACHE_KEY, { theme });
		});
	}

	protected get getAvailableThemes(): Array<string> {
		return [LIGHT_THEME, DARK_THEME];
	}
} */
