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

import VueI18n from "vue-i18n";
import supportedLanguages from "@/supported-languages.json";
import { LoggingService } from "@/app/shared/services/logging";
import { isNull, isUndefined } from "@/app/shared/utils/any";
import { format as formatDateFns } from "date-fns";
import { AppClientSettingsStore } from "@/app/shared/store/client-settings";
import { injectable } from "inversify";
import { inject } from "inversify-props";

@injectable()
export class I18nService {
	private readonly i18n!: VueI18n;
	private readonly cached: string[] = [];

	constructor(
		@inject() private readonly loggingService: LoggingService,
		@inject()
		private readonly appClientSettingsStore: AppClientSettingsStore
	) {
		this.i18n = new VueI18n({
			fallbackLocale: supportedLanguages[0].tag,
			messages: {}
		});
	}

	public get current(): Language {
		return this.appClientSettingsStore.clientSettings.language as Language;
	}

	public get supportedLanguages(): Language[] {
		return supportedLanguages;
	}

	public formatDate(date: Date | number | string, style?: string): string {
		return formatDateFns(
			typeof date === "string" ? new Date(date) : date,
			style || "PPPPpp",
			{
				locale: require(`date-fns/locale/${this.i18n.locale}/index.js`)
			}
		);
	}

	/**
	 * Sets the client's current language to the specified language.
	 * @param {Language} language - the new language.
	 */
	public setLanguage(language: Language): void {
		const current = this.appClientSettingsStore.clientSettings.language;
		if (
			isUndefined(current) ||
			isNull(current) ||
			current.tag !== language.tag
		) {
			this.appClientSettingsStore.updateClientSettings(
				{ language },
				true
			);

			this.i18n.locale = language.tag;
			document.querySelector("html")?.setAttribute("lang", language.tag);
		}
	}

	public async loadLanguage0(
		language: Language,
		fallback?: readonly string[]
	): Promise<void> {
		const tag = language.tag;

		if (this.i18n.locale === tag) return;

		// already loaded, let's set it
		if (this.cached.includes(tag)) {
			this.setLanguage(language);
			return;
		}

		return import(
			/* webpackChunkName: "lang-[request]" */ `@/lang/${tag}.json`
		)
			.then(async (messages) => {
				this.i18n.setLocaleMessage(tag, messages);
				this.cached.push(tag);
				this.setLanguage(language);
			})
			.catch(async (error: unknown) => {
				this.loggingService.error({
					message: `Unable to load language ${language}`,
					args: [error]
				});

				if (isUndefined(fallback) || fallback.length === 0)
					return await this.loadLanguage(
						this.i18n.fallbackLocale as string
					);
				else
					return await this.loadLanguage(
						fallback[0],
						fallback.slice(1)
					);
			});
	}

	/**
	 * Attempts to load messages into the specified language
	 * and tries to set it as the client's current language.
	 * @param {string} language - the language to be loaded.
	 * @param {ReadonlyArray<string>} fallback - other languages to load if the specified language fails to load.
	 */
	public async loadLanguage(
		language: string,
		fallback?: readonly string[]
	): Promise<any> {
		const separator = language.indexOf("-");
		if (separator !== -1) {
			// fix navigator language tag: en-us -> en-US
			language =
				language.substr(0, separator) +
				language.substr(separator, language.length).toUpperCase();
		}

		const supported = supportedLanguages.find(
			(value) => language === value.tag
		);

		if (!supported) {
			this.loggingService.warn(`Unsupported language: ${language}`);
			return language;
		}

		return this.loadLanguage0(supported, fallback);
	}

	public getI18n(): VueI18n {
		return this.i18n;
	}
}
