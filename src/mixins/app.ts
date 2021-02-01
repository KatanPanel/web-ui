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

import Vue from "vue";
import Component from "vue-class-component";
import { DARK_THEME, Language, LIGHT_THEME, Window } from "@/store/state";
import { GET_ALL_WINDOWS, GET_LANGUAGE, GET_THEME } from "@/store/getters";
import { loadLanguage } from "@/i18n";
import { dispatch, get } from "@/common/utils/vuex";
import { ROOT_MODULE, THEME_CACHE_KEY } from "@/store";
import { supportedLanguages } from "@/supported-languages";
import { UPDATE_THEME } from "@/store/actions";

@Component
export class AppMixin extends Vue {
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

	/**
	 * In-component shortcut for {@link getServerList}
	 */
	public get serverList(): Array<any> {
		return getServerList();
	}

	public getWindow(window: number): Window | null {
		return getWindow(window);
	}

	public openWindow(window: Window) {
		openWindow(window);
	}

	public closeWindow(window: number) {
		closeWindow(window);
	}

	/**
	 * Returns all open windows in natural order.
	 */
	public get getAllWindows(): Array<Window> {
		return get<Window[]>(ROOT_MODULE, GET_ALL_WINDOWS);
	}

	/**
	 * Returns all open windows sorted in descending order.
	 */
	public get getAllWindowsSorted(): Array<Window> {
		// The `slice(0)` is here because `getAllOpenWindows` is a reactive
		// property and Vuex does not allow properties outside mutation handlers.
		// Slice will create a copy for us to draw without disturbing the original property.
		return this.getAllWindows.slice(0).sort().reverse();
	}

	/**
	 * Returns all open windows in natural order.
	 */
	public get getOpenWindows(): Array<Window> {
		return getOpenWindows();
	}

	/**
	 * Returns all closed windows in natural order.
	 */
	public get getClosedWindows(): Array<Window> {
		return get<Window[]>(ROOT_MODULE, GET_ALL_WINDOWS).filter(
			(window: Window) => !window.isOpen
		);
	}
}
