import { nextTick } from "vue"
import type { I18n, Locale } from "vue-i18n"
import { createI18n } from "vue-i18n"

export const SUPPORTED_LOCALES: string[] = ["en", "pt"]

export function setI18nLanguage(i18n: I18n, locale: Locale) {
    i18n.global.locale.value = locale
    document.querySelector("html")?.setAttribute("lang", locale)
}

export async function loadLocaleMessages(i18n: I18n, locale: Locale): Promise<void> {
    const messages = await import(`./lang/${locale}.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
    return nextTick()
}

export const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE
    ?? import.meta.env.VITE_FALLBACK_LOCALE
    ?? SUPPORTED_LOCALES[0];

export default createI18n({
    locale: DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: true
})
