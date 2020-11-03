import Vue from "vue";
import VueI18n from "vue-i18n";
import defaultMessages from "@/assets/lang/en-US.json";
import { SET_LANGUAGE } from "@/store/actions";
import store from "@/store";
import supportedLanguages from "./assets/lang/supported-languages";

Vue.use(VueI18n);

export const FALLBACK_LANGUAGE = "en";
const fallbackMessages = defaultMessages;

const loaded: string[] = [];
const i18n = new VueI18n({
	locale: FALLBACK_LANGUAGE,
	fallbackLocale: FALLBACK_LANGUAGE,
	messages: {
		[FALLBACK_LANGUAGE]: fallbackMessages,
	},
});

const vm: Vue = Vue.prototype;
export function updateLanguage(language: string) {
	(vm.$i18n || i18n).locale = language;
	document.querySelector("html")!.setAttribute("lang", language);
}

export function setLanguage(language: string) {
	updateLanguage(language);
	store.dispatch(SET_LANGUAGE, {
		language: supportedLanguages.find(
			(supported) => language === supported.tag
		)!,
	});
}

export async function loadLanguage(
	language: string,
	fallback: ReadonlyArray<string> = []
) {
	if (loaded.includes(language)) return setLanguage(language);

	return import(
		/* webpackChunkName: "lang-[request]" */ `@/assets/lang/${language}.json`
	)
		.then((messages) => {
			(vm.$i18n || i18n).setLocaleMessage(language, messages);
			loaded.push(language);
			setLanguage(language);
		})
		.catch(async () => {
			console.warn(`Unable to load language "${language}".`);

			if (fallback.length === 0) {
				await loadLanguage(FALLBACK_LANGUAGE);
				return;
			}

			await loadLanguage(fallback[0], fallback.slice(1));
		});
}

export default i18n;
