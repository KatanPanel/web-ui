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
import { ROOT_MODULE } from "@/store";
import { supportedLanguages } from "./supported-languages";
import { dispatch } from "@/common/utils/vuex";
import { UPDATE_LANGUAGE } from "@/store/actions";
import * as dayjs from "dayjs";

Vue.use(VueI18n);

export const FALLBACK_LANGUAGE = "en";
export const I18N_LOG_TAG = "I18N";

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

	dispatch(ROOT_MODULE, UPDATE_LANGUAGE, {
		language: supported,
	}).then(async () => updateLanguage(language));
}

export async function loadLanguage(
	language: string,
	fallback: ReadonlyArray<string> = []
) {
	if (i18n.locale === language) return;

	if (loaded.includes(language)) {
		vm.$log.info({
			tag: I18N_LOG_TAG,
			message: `Reloading language "${language}"...`,
		});
		return setLanguage(language);
	}

	vm.$log.info({
		tag: I18N_LOG_TAG,
		message: `Loading language "${language}"...`,
	});
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

			await setLanguage(language);
		})
		.catch(async (e) => {
			vm.$log.info({
				tag: I18N_LOG_TAG,
				message: `Cannot load language ${language}.`,
			});
			console.error(e);

			if (fallback.length === 0) {
				await loadLanguage(FALLBACK_LANGUAGE);
				return;
			}

			await loadLanguage(fallback[0], fallback.slice(1));
		});
}

export default i18n;
