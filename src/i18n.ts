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
import * as dayjs from "dayjs";
import { supportedLanguages } from "./common/language";
import { I18N_LOG_TAG } from "@/logging";
import { updateClientSettings } from "@/common/client-settings";

Vue.use(VueI18n);

export const FALLBACK_LANGUAGE = "en";

const loaded: string[] = [];
const i18n = new VueI18n({
	fallbackLocale: FALLBACK_LANGUAGE,
	messages: {
		[FALLBACK_LANGUAGE]: require(`@/lang/${FALLBACK_LANGUAGE}.json`),
	},
});

const vm: Vue = Vue.prototype;

async function importDayJSLocale(code: string) {
	return import(
		/* webpackChunkName: "dayjs-locale-[request]" */ `dayjs/locale/${code}`
	);
}

/**
 * Updates the document language to the specified language and
 * loads the date and time translation settings for that language.
 * @param {string} language - the new language.
 */
export async function updateLanguage(language: string) {
	(vm.$i18n || i18n).locale = language;

	const lower = language.toLowerCase();
	let locale;
	try {
		locale = await importDayJSLocale(lower);
	} catch (e) {
		// try to load simplified locale name, ex: en_US -> en
		const separator = lower.indexOf("-");
		if (separator)
			locale = await importDayJSLocale(lower.substr(0, separator));
		else {
			vm.$log.error({
				tag: I18N_LOG_TAG,
				message: `Cannot load the translations for ${language} date and time.`,
			});
			return;
		}
	}

	dayjs.locale(locale);
	vm.$log.info({
		tag: I18N_LOG_TAG,
		message: `Document language updated to ${language}.`,
	});
	document.querySelector("html")!.setAttribute("lang", language);
}

/**
 * Sets the client's current language to the specified language if supported.
 * @param {string} language - the new language.
 */
export async function setLanguage(language: string) {
	const supported = supportedLanguages.find(
		(value) => language === value.tag
	);

	if (!supported) {
		vm.$log.error({
			tag: I18N_LOG_TAG,
			message: `Unsupported language: ${language}.`,
		});
		return;
	}

	if ((vm.$i18n || i18n).locale === language) {
		// avoid language redefinition
		return;
	}

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
	if (i18n.locale === language) return;

	if (loaded.includes(language)) {
		vm.$log.info({
			tag: I18N_LOG_TAG,
			message: `Language "${language}" reloaded.`,
		});
		return await setLanguage(language);
	}

	return import(
		/* webpackChunkName: "lang-[request]" */ `./lang/${language}.json`
	)
		.then(async (messages) => {
			(vm.$i18n || i18n).setLocaleMessage(language, messages);
			loaded.push(language);
			vm.$log.info({
				tag: I18N_LOG_TAG,
				message: `Language "${language}" loaded.`,
			});

			return await setLanguage(language);
		})
		.catch(async (e) => {
			vm.$log.error({
				tag: I18N_LOG_TAG,
				message: `Cannot load language ${language}.`,
				args: [e],
			});

			if (fallback.length === 0)
				return await loadLanguage(FALLBACK_LANGUAGE);
			else return await loadLanguage(fallback[0], fallback.slice(1));
		});
}

export default i18n;
