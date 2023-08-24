import { nextTick } from "vue";
import { createI18n, I18nOptions } from "vue-i18n";
import dayjs from "dayjs";
import { isUndefined } from "@/utils";

export const SUPPORT_LOCALES: string[] = ["en-US"];

export function setupI18n(
	options: I18nOptions = { locale: SUPPORT_LOCALES[0] }
) {
	const i18n = createI18n(options);
	setI18nLanguage(i18n, options.locale);
	return i18n;
}

export function setI18nLanguage(i18n, locale) {
	if (i18n.mode === "legacy") {
		i18n.global.locale = locale;
	} else {
		i18n.global.locale.value = locale;
	}

	updateTime(locale);

	/**
	 * NOTE: If you need to specify the language setting for headers, such as
	 * the `fetch` API, set it here. The following is an example for axios.
	 *
	 * axios.defaults.headers.common['Accept-Language'] = locale
	 */
	document.querySelector("html")?.setAttribute("lang", locale);
}

function updateTime(locale: string) {
	if (isUndefined(locale) || locale.length === 0) return;

	require.context(
		`dayjs/locale/${locale}`,
		undefined,
		undefined,
		"lazy-once"
	);
	dayjs.locale(locale);
}

export async function loadLocaleMessages(i18n, locale) {
	// load locale messages with dynamic import
	const messages = await import(
		/* webpackChunkName: "locale-[request]" */ `@/lang/${locale}.json`
	);

	// set locale and locale message
	i18n.global.setLocaleMessage(locale, messages.default);

	return nextTick();
}
