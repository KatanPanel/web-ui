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
import VueI18n from "vue-i18n";
import { I18N_LOG_TAG } from "@/logging";
import {
	getClientSettings,
	updateClientSettings
} from "@/common/client-settings";
import supportedLanguages from "@/supported-languages.json";
import { format as formatDateFns } from "date-fns";

Vue.use(VueI18n);

const fallbackLanguage = supportedLanguages[0].tag;
const loaded: string[] = [];
const i18n = new VueI18n({
	fallbackLocale: fallbackLanguage,
	messages: {}
});

const vm: Vue = Vue.prototype;

export function formatDate(
	date: Date | number | string,
	style?: string
): string {
	return formatDateFns(
		typeof date === "string" ? new Date(date) : date,
		style || "PPPPpp",
		{
			locale: require(`date-fns/locale/${i18n.locale}/index.js`)
		}
	);
}

/**
 * Updates the document language to the specified language and
 * loads the date and time translation settings for that language.
 * @param {string} language - the new language.
 */
export async function updateLanguage(language: string): Promise<string> {
	(vm.$i18n || i18n).locale = language;
	document.querySelector("html")?.setAttribute("lang", language);
	return language;
}

/**
 * Sets the client's current language to the specified language if supported.
 * @param {string} language - the new language.
 */
export async function setLanguage(language: string): Promise<string> {
	const supported = supportedLanguages.find(
		(value) => language === value.tag
	);

	if (!supported) {
		vm.$log.warn({
			tag: I18N_LOG_TAG,
			message: `Unsupported language: ${language}.`
		});
		return language;
	}

	if ((vm.$i18n || i18n).locale === language) {
		// avoid language redefinition
		return language;
	}

	if (!getClientSettings().language)
		updateClientSettings({ language: supported });

	return await updateLanguage(language);
}

/**
 * Attempts to load messages into the specified language
 * and tries to set it as the client's current language.
 * @param {string} language - the language to be loaded.
 * @param {ReadonlyArray<string>} fallback - other languages to load if the specified language fails to load.
 */
export async function loadLanguage(
	language: string,
	fallback: ReadonlyArray<string> = []
): Promise<any> {
	const separator = language.indexOf("-");
	if (separator !== -1) {
		// fix navigator language tag: en-us -> en-US
		language =
			language.substr(0, separator) +
			language.substr(separator, language.length).toUpperCase();
	}

	if (i18n.locale === language) return language;

	if (loaded.includes(language)) {
		vm.$log.info({
			tag: I18N_LOG_TAG,
			message: `Language "${language}" reloaded.`
		});
		return await setLanguage(language);
	}

	return import(
		/* webpackChunkName: "katan-lang-[request]" */ `./lang/${language}.json`
	)
		.then(async (messages) => {
			(vm.$i18n || i18n).setLocaleMessage(language, messages);
			loaded.push(language);
			vm.$log.info({
				tag: I18N_LOG_TAG,
				message: `Language "${language}" loaded.`
			});

			return await setLanguage(language);
		})
		.catch(async (e) => {
			vm.$log.error({
				tag: I18N_LOG_TAG,
				message: `Unable load language ${language}.`,
				args: [e]
			});

			if (fallback.length === 0)
				return await loadLanguage(fallbackLanguage);
			else return await loadLanguage(fallback[0], fallback.slice(1));
		});
}

export default i18n;
