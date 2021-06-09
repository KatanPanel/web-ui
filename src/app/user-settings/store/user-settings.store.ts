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
import { isUndefined } from "@/app/shared/utils";
import { UserSettingsModel } from "@/app/user-settings/models/user-settings.model";
import { isDarkThemePreferred } from "@/app/shared/utils/dom";
import {
	AppDarkTheme,
	AppLightTheme,
	AppSystemDefaultTheme
} from "@/app/app.module";

@Module({ name: "user-settings", namespaced: true })
export class UserSettingsStore extends VuexModule {
	private _settings: UserSettingsModel = {
		theme: null,
		language: null,
		developerMode: false,
		serverSettings: {}
	};

	public get getSettings(): UserSettingsModel {
		return this._settings;
	}

	@Mutation
	public updateSettings(payload: {
		settings: Partial<UserSettingsModel>;
	}): void {
		const settings = payload.settings;
		const docupdate = (value: string) =>
			document.querySelector("body")?.setAttribute("data-theme", value);

		const theme = settings.theme;
		if (!isUndefined(theme)) {
			const machineDefault = theme === AppSystemDefaultTheme;
			if (machineDefault)
				docupdate(
					isDarkThemePreferred() ? AppDarkTheme : AppLightTheme
				);
			else if (this._settings.theme !== theme) docupdate(theme as string);
		}

		this._settings = Object.assign(this._settings, settings);
	}
}
