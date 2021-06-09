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

import { KatanModule, Module } from "@/ioc";
import { UserSettingsPresenter } from "@/app/user-settings/user-settings.presenter";
import { UserSettingsStore } from "@/app/user-settings/store/user-settings.store";
import { UserSettingsRouter } from "@/app/user-settings/router/user-settings.router";
import { UserSettingsModel } from "@/app/user-settings/models/user-settings.model";
import { LocalStorageService } from "@/app/shared/services/local-storage.service";

export const USER_SETTINGS_INJECTION_KEY = Symbol("katan:user-settings");
export const USER_SETTINGS_CACHE_KEY = "settings";

@Module({
	stateManagement: [UserSettingsStore],
	services: [UserSettingsPresenter],
	router: UserSettingsRouter
})
export default class UserSettingsModule extends KatanModule {
	init() {
		this.container.bindDynamic(USER_SETTINGS_INJECTION_KEY, () => {
			return this.container.get<UserSettingsStore>(UserSettingsStore)
				.getSettings;
		});
	}

	afterInit() {
		const userSettingsStore = this.container.get<UserSettingsStore>(
			UserSettingsStore
		);
		const localStorage = this.container.get<LocalStorageService>(
			LocalStorageService
		);
		if (!localStorage.has(USER_SETTINGS_CACHE_KEY)) {
			userSettingsStore.updateSettings({
				settings: {
					theme: "system-default"
				}
			});
			return;
		}

		userSettingsStore.updateSettings({
			settings: localStorage.get<UserSettingsModel>(
				USER_SETTINGS_CACHE_KEY
			) as UserSettingsModel
		});
	}
}
