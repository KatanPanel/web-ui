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

import {
	Constructor,
	KatanModule,
	KatanRouting
} from "@/app/shared/models/module";
import { LoggingService } from "@/app/shared/services/logging";
import { ConfigService } from "@/app/shared/services/config";
import { HttpService } from "@/app/shared/services/http";
import { WebSocketService } from "@/app/shared/services/websocket";
import {
	AppClientSettingsStore,
	CLIENT_SETTINGS_CACHE_KEY
} from "@/app/shared/store/client-settings";
import { StorageService } from "@/app/shared/services/storage";
import { isUndefined } from "@/app/shared/utils/any";
import { isDarkThemePreferred } from "@/app/shared/utils/dom";
import { CLIENT_SETTINGS_DARK_THEME } from "@/app/shared/models/client-settings";
import { AuthenticatedOnlyGuard } from "@/app/auth/guards/authenticated-only";
import { I18nService } from "@/app/shared/services/i18n";
import { VuexModule } from "vuex-module-decorators";
import { AppWebSocketStore } from "@/app/shared/store/websocket";
import { AppNavigationStore } from "@/app/shared/store/navigation";
import { AppStore } from "@/app/app.store";
import Vue from "vue";
import { VueJSModalOptions } from "vue-js-modal";
import VModal from "vue-js-modal/dist/index.nocss.js";
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import VueMeta from "vue-meta";
import VTooltip from "v-tooltip";
import VueNativeSock from "vue-native-websocket";
import { RouterHrefDirective } from "@/app/shared/directives/router-href";
import { ClickOutsideDirective } from "@/app/shared/directives/click-outside";

export default class AppModule extends KatanModule {
	init() {
		this.bindAll([
			LoggingService,
			ConfigService,
			HttpService,
			StorageService,
			WebSocketService,
			I18nService
		]);
	}

	installDirectives(): void {
		Vue.directive("router-href", RouterHrefDirective);
		Vue.directive("click-outside", ClickOutsideDirective);
	}

	installPlugins(): void {
		const config = this.get<ConfigService>(ConfigService);
		Vue.use<VueJSModalOptions>(VModal, {
			dialog: false
		});
		Vue.use(VueSvgInlinePlugin);

		Vue.use(VueMeta, { refreshOnceOnNavigation: true });
		Vue.use(VTooltip, {
			defaultClass: "v--tooltip"
		});

		// disable tooltips on mobile devices
		(VTooltip as any).enabled = window.innerWidth >= 768;

		Vue.use(VueNativeSock, config.wsUrl, {
			connectManually: true,
			reconnection: true,
			format: "json"
		});
	}

	setupClientSettings(): void {
		const storageService = this.get(StorageService);
		console.log("storage:", storageService);
		const appClientSettingsStore = this.get(AppClientSettingsStore);
		console.log("app client settings:", appClientSettingsStore);

		// preload client settings if defined before
		if (storageService.has(CLIENT_SETTINGS_CACHE_KEY)) {
			appClientSettingsStore.updateClientSettings(
				storageService.get(CLIENT_SETTINGS_CACHE_KEY),
				true
			);
		}

		const clientSettings = appClientSettingsStore.clientSettings;

		// set the default dark theme if it is set as machine preference
		if (isUndefined(clientSettings?.theme)) {
			appClientSettingsStore.updateClientSettings(
				{
					theme: isDarkThemePreferred()
						? CLIENT_SETTINGS_DARK_THEME
						: null
				},
				false
			);
		}
	}

	afterInit() {
		this.installPlugins();
		this.installDirectives();
		this.setupClientSettings();
	}

	stateManagement(): Constructor<VuexModule>[] {
		return [
			AppStore,
			AppClientSettingsStore,
			AppWebSocketStore,
			AppNavigationStore
		];
	}

	routes(): KatanRouting {
		return [
			{
				path: "/",
				root: true,
				component: this.resolve("Panel"),
				beforeEnter: this.navigationGuard(AuthenticatedOnlyGuard),
				children: [
					{
						path: "",
						name: "home",
						component: this.resolve("home/Home")
					},
					{
						path: "library",
						name: "library",
						component: this.resolve("library/GameLibrary")
					}
				]
			},
			{
				path: "*",
				redirect: "/",
				root: true
			}
		];
	}
}
