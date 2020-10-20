import Vue from "vue";
import VueI18n from "vue-i18n";
import supportedLanguages from "./supportedLanguages.json";
import defaultMessages from "./lang/en.json";
import { SET_LANGUAGE } from "@/store/actions";
import store from "./store";

Vue.use(VueI18n);

const FALLBACK = "en";
const fallbackMessages = defaultMessages;

const loaded: string[] = [];
const i18n = new VueI18n({
	locale: FALLBACK,
	fallbackLocale: FALLBACK,
	messages: {
		[FALLBACK]: fallbackMessages,
	},
});

function setLanguage(language: string) {
	i18n.locale = language;

	store.dispatch(SET_LANGUAGE, {
		language: supportedLanguages.find(
			(supported) => language === supported.tag
		)!,
	});
	document.querySelector("html")!.setAttribute("lang", language);
}

export async function loadLanguage(
	language: string,
	fallback: ReadonlyArray<string> = []
) {
	if (loaded.includes(language)) return setLanguage(language);

	return import(
		/* webpackChunkName: "lang-[request]" */ `@/lang/${language}.json`
	)
		.then((messages) => {
			i18n.setLocaleMessage(language, messages);
			loaded.push(language);
			setLanguage(language);
		})
		.catch(async () => {
			console.warn(`Unable to load language "${language}".`);

			if (fallback.length === 0) {
				await loadLanguage(FALLBACK);
				return;
			}

			await loadLanguage(fallback[0], fallback.slice(1));
		});
}

export default i18n;
