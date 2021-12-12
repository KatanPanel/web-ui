import { UserSettingsStore } from "@/app/user-settings/store/user-settings.store";
import Vue from "vue";
import { VueJSModalOptions } from "vue-js-modal";
import VModal from "vue-js-modal/dist/index.nocss.js";
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import VueMeta from "vue-meta";
import VTooltip from "v-tooltip";
import VueNativeSock from "vue-native-websocket";
import { KatanModule, Module } from "@/di";
import { RouterHrefDirective } from "@/app/shared/directives/router-href.directive";
import { ClickOutsideDirective } from "@/app/shared/directives/click-outside.directive";
import { LoggingService } from "@/app/shared/services/logging.service";
import { ConfigService } from "@/app/shared/services/config.service";
import { I18nService } from "@/app/shared/services/i18n.service";
import { LocalStorageService } from "@/app/shared/services/local-storage.service";
import { AppRouter } from "@/app/shared/app.router";
import { AppStore } from "@/app/shared/store/app.store";
import VueTour from "vue-tour";

import "../assets/styles/main.scss";

require("vue-tour/dist/vue-tour.css");

export const AppLightTheme = "light";
export const AppDarkTheme = "dark";
export const AppSystemDefaultTheme = "system-default";

export type AppTheme =
	| typeof AppLightTheme
	| typeof AppDarkTheme
	| typeof AppSystemDefaultTheme;

export const AppThemes: readonly AppTheme[] = [
	AppLightTheme,
	AppDarkTheme,
	AppSystemDefaultTheme
];

@Module({
	router: AppRouter,
	stateManagement: AppStore,
	services: [LoggingService, ConfigService, LocalStorageService, I18nService],
	directives: {
		"router-href": RouterHrefDirective,
		"click-outside": ClickOutsideDirective
	}
})
export default class AppModule extends KatanModule {
	afterInit() {
		this.installPlugins();
	}

	private installPlugins(): void {
		const config = this.container.get<ConfigService>(ConfigService);
		Vue.use<VueJSModalOptions>(VModal, {
			dialog: false
		});
		Vue.use(VueSvgInlinePlugin);

		Vue.use(VueMeta, { refreshOnceOnNavigation: true });
		Vue.use(VTooltip, {
			defaultClass: "v--tooltip",
			defaultBoundariesElement: document.body
		});

		// detect system theme change
		if (window.matchMedia) {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (e) => {
					const userSettingsStore = this.container.get<
						UserSettingsStore
					>(UserSettingsStore);

					// only update if you don't have any preferred theme selected
					if (
						userSettingsStore.getSettings.theme !==
						AppSystemDefaultTheme
					)
						return;

					userSettingsStore.updateSettings({
						settings: {
							theme: AppSystemDefaultTheme
						}
					});
				});
		}

		// disable tooltips on mobile devices
		(VTooltip as any).enabled = window.innerWidth >= 768;

		Vue.use(VueNativeSock, config.wsUrl, {
			connectManually: true,
			reconnection: true,
			format: "json"
		});

		Vue.use(VueTour);
	}
}
