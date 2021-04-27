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

import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	CLIENT_SETTINGS_DARK_THEME,
	CLIENT_SETTINGS_LIGHT_THEME,
	ClientSettings
} from "@/app/shared/models/client-settings";
import { isNull, isUndefined } from "@/app/shared/utils/any";
import { isDarkThemePreferred } from "@/app/shared/utils/dom";
import { injectable } from "inversify-props";
import { StorageService } from "@/app/shared/services/storage";
import { LazyInject } from "@/app/shared/models/module";
import store from "@/store";

export const CLIENT_SETTINGS_CACHE_KEY = "settings";
export const CLIENT_SETTINGS_THEME_ATTR = "data-theme";

export const defaultClientSettings: ClientSettings = {
	theme: null,
	language: null,
	developerMode: false,
	serverSettings: {
		resourceUpdateTime: 1,
		showConsoleLogDate: "hover"
	}
};

@injectable()
@Module({
	name: "app-clientSettings",
	dynamic: true,
	store: store
})
export class AppClientSettingsStore extends VuexModule {
	clientSettings: ClientSettings = defaultClientSettings;
	@LazyInject() private readonly storageService!: StorageService;

	@Mutation
	public updateClientSettings(
		payload: Partial<ClientSettings>,
		update?: boolean
	): void {
		if (!isUndefined(payload.theme)) {
			const machineDefault = isNull(payload.theme);

			if (machineDefault) {
				document
					.querySelector("body")
					?.setAttribute(
						CLIENT_SETTINGS_THEME_ATTR,
						isDarkThemePreferred()
							? CLIENT_SETTINGS_DARK_THEME
							: CLIENT_SETTINGS_LIGHT_THEME
					);
			} else if (this.clientSettings?.theme !== payload.theme) {
				// theme have been updated
				document
					.querySelector("body")
					?.setAttribute(
						CLIENT_SETTINGS_THEME_ATTR,
						payload.theme as string
					);
			}
		}

		if (isUndefined(update) || update !== false) {
			this.clientSettings = Object.assign(this.clientSettings, payload);
		}
	}

	public saveClientSettings() {
		this.storageService.set(CLIENT_SETTINGS_CACHE_KEY, this.clientSettings);
	}
}
