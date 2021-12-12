import { KatanModule, Module } from "@/di";
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
