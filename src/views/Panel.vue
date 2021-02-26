<!--
  - Copyright (c) 2020-present Katan
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template>
	<v-container
		v-if="loading"
		key="loading"
		class="v--flex v--flex-justify-center v--flex-column v--full-height"
	>
		<loading />
	</v-container>
	<v-container
		v-else-if="error"
		key="error"
		class="v--flex v--flex-justify-center v--flex-column v--full-height v--text-align-center"
	>
		<h1>
			<b>{{ $t("modules.panel.error.title") }}</b>
		</h1>
		<p>{{ $t("modules.panel.error.description") }}</p>
		<i18n path="modules.panel.error.persistence" tag="p">
			<a href="https://github.com/KatanPanel/Katan/wiki/">{{
				$t("modules.panel.error.click-here")
			}}</a>
		</i18n>
	</v-container>
	<div v-else key="loaded" class="panel">
		<transition name="v--transition-linear-slide-rl" mode="in-out">
			<div
				class="windows-mask"
				id="windows-mask"
				v-if="showingWindows"
				@click="closeWindowsMask"
			>
				<div class="windows">
					<h4 class="v--m-bottom-5">Em segundo plano</h4>
					<hr />
					<small class="v--text-uppercase v--text-fw-800"
						>Janela atual – {{ getOpenWindows.length }}</small
					>
					<ul class="window-list v--m-bottom-3">
						<li
							:key="window.id"
							v-for="window in getOpenWindows"
							class="window-item"
							:active="true"
						>
							<ServerWindow :window="window.id" />
						</li>
					</ul>

					<small class="v--text-uppercase v--text-fw-800"
						>Outras janelas –
						{{ getMinimizedWindows.length }}</small
					>
					<ul class="window-list">
						<router-link
							:key="window.id"
							:active="window.isOpen"
							:to="window.location"
							v-for="window in getMinimizedWindows"
							@click.native="
								switchWindow(window) + closeShowingWindows()
							"
							tag="li"
							class="window-item"
						>
							<a><ServerWindow :window="window.id" /></a>
						</router-link>
					</ul>
				</div>
			</div>
		</transition>
		<ul class="navigation">
			<!-- <div class="context-switcher">
				<a :href="getPreviousNavigationRoute.fullPath"
				   v-if="getPreviousNavigationRoute"
				   v-tooltip="'Teste'"
				   @click="switchToPreviousNavigationRoute"
				   class="previous"
				>
					<v-icon name="arrow-left" />
					<span>{{ $t(`routes.${getPreviousNavigationRoute.name.replaceAll(".", "_")}`) }}</span>
				</a>
				<div v-else class="previous" disabled>
					<v-icon name="arrow-left" />
					<span>{{ $t(`routes.home`) }}</span>
				</div>
			</div> -->
			<div class="window-switcher">
				<li
					@click="showingWindows = !showingWindows"
					v-tooltip="{
						content: showingWindows
							? ''
							: 'Janelas em segundo plano',
						placement: 'left',
					}"
					:active="showingWindows"
				>
					<span v-if="!showingWindows" key="active-windows">
						<v-icon name="algorithm" />
					</span>
					<span v-else key="hidden-windows">
						<v-icon name="close-circle" />
					</span>
				</li>
				<!-- <router-link
					:to="{ name: 'panel.account' }"
					tag="li"
					class="account"
				>
					<a
						class="account"
						v-tooltip="{
						content: getAccount.username,
						placement: 'bottom',
					}"
					>
						<div
							class="account-avatar"
							:style="{
							'background-image':
								'url(https://images-ext-2.discordapp.net/external/Bhe4P3WRPvIUt2ct3c8Nl2LsswWVdUk5qC4O8PgY_28/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/730099264335773797/82767c6e44e631bae8bf1b98355cd3d8.png?width=590&height=590)',
						}"
						/>
					</a>
				</router-link> -->
			</div>
		</ul>
		<div class="panel-view" :disabled="showingWindows">
			<router-view v-if="getOpenWindows.length === 0" key="panel-view" />
			<ServerContainer
				v-show="getOpenWindows.length > 0"
				key="windows-view"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { ROOT_MODULE } from "@/store";
import VContainer from "@/components/ui/layout/VContainer.vue";
import Loading from "@/components/Loading.vue";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { mixins } from "vue-class-component";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import ServerContainer from "@/components/server/ServerContainer.vue";
import ServerWindow from "@/components/server/ServerWindow.vue";
import { commit, get } from "@/common/utils/vuex";
import { AppMixin } from "@/common/internal/mixins/app";
import { AuthMixin } from "@/common/internal/mixins/auth";
import { AxiosResponse } from "axios";
import { UPDATE_BACKEND_INFO } from "@/store/mutations";
import { hasTabKeyPressed } from "@/common/utils/dom";
import VHotKey from "@/components/ui/hotkey/VHotKey.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import {
	getWindowsBy,
	MinimizedWindowState,
	OpenWindowState,
	switchWindow,
	Window,
} from "@/common/navigation/window";
import { GET_NAVIGATION_HISTORY } from "@/store/getters";
import { Route } from "vue-router";

@Component<Panel>({
	components: {
		VBoxBody,
		VBox,
		VHotKey,
		ServerWindow,
		ServerContainer,
		VLabel,
		VIcon,
		TheBreadcrumb,
		Loading,
		VContainer,
	},
	mounted(): void {
		const vm = this as Panel;
		document.addEventListener("keyup", vm.onTabKeyUp);
		document.addEventListener("keydown", vm.onTabKeyDown);

		this.$http
			.get("/info")
			.then((res: AxiosResponse) => {
				this.error = false;
				commit(ROOT_MODULE, UPDATE_BACKEND_INFO, res.data.data);
			})
			.catch(() => (this.error = true))
			.finally(() => (this.loading = false));
	},
	destroyed() {
		const vm = this as Panel;
		document.removeEventListener("keyup", vm.onTabKeyUp);
		document.removeEventListener("keydown", vm.onTabKeyDown);
	},
})
export default class Panel extends mixins(AppMixin, AuthMixin) {
	loading = true;
	error = false;
	showingWindows = false;

	private closeShowingWindows(): void {
		this.showingWindows = false;
	}

	private closeWindowsMask(e: Event): void {
		if ((e.target as HTMLElement).id !== "windows-mask") return;

		this.showingWindows = false;
	}

	onTabKeyUp(e: KeyboardEvent): void {
		if (hasTabKeyPressed(e)) this.showingWindows = !this.showingWindows;
	}

	onTabKeyDown(e: KeyboardEvent): void {
		if (hasTabKeyPressed(e)) e.preventDefault();
	}

	get getOpenWindows(): Array<Window> {
		return getWindowsBy(OpenWindowState);
	}

	get getMinimizedWindows(): Array<Window> {
		return getWindowsBy(MinimizedWindowState);
	}

	private switchWindow(window: Window) {
		switchWindow(window);
	}

	get getPreviousNavigationRoute(): Route | null {
		const history = get(ROOT_MODULE, GET_NAVIGATION_HISTORY);
		if (history.length < 1) return null;

		return history[history.length - 2];
	}

	switchToPreviousNavigationRoute(e: Event): void {
		const previous = this.getPreviousNavigationRoute;
		if (!previous) return;

		e.preventDefault();
		this.$router.back();
	}
}
</script>
<style lang="scss" scoped>
.panel {
	display: block;
	position: relative;

	.panel-view {
		transition: filter linear 0.15s;

		&[disabled] {
			filter: blur(4px);
		}
	}
}

.windows-mask {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 1;

	.windows {
		position: fixed;
		background-color: var(--kt-primary-color);
		color: var(--inverse-color);
		right: 0;
		height: 100%;
		border-top-left-radius: 10%;
		border-bottom-left-radius: 10%;
		padding: 48px;
		z-index: 1001;
		box-shadow: var(--kt-primary-color) -2px 0 8px 0;
		min-width: 30%;
		max-width: 30%;

		.window-item {
			list-style: none;

			&:not(:last-child) {
				margin-bottom: 6px;
			}
		}
	}
}

.navigation {
	position: absolute;
	display: flex;
	align-items: center;
	z-index: 1;
	right: 0;

	.context-switcher {
		flex: 1;
		display: flex;

		.previous {
			font-weight: 600;
			text-decoration: none;

			span {
				margin-left: 16px;
				vertical-align: middle;
			}

			&[disabled] {
				opacity: 0.38;
			}
		}
	}

	.window-switcher {
		display: flex;
	}

	li {
		position: relative;
		z-index: 0;
		list-style: none;

		&:not(:last-child) {
			margin-right: 24px;
		}

		&:not(.account) {
			position: relative;
			width: 48px;
			height: 48px;
			display: inline-flex;
			align-items: center;
			justify-content: center;

			svg {
				fill: var(--kt-primary-color);
			}

			&[active] {
				svg {
					fill: #ffffff;
				}

				&::before {
					background-color: #ffffff;
				}
			}

			&:hover {
				cursor: pointer;

				&::before {
					opacity: 0.18;
				}
			}

			&::before {
				content: "";
				position: absolute;
				background-color: var(--kt-primary-color);
				opacity: 0.12;
				width: 48px;
				height: 48px;
				z-index: -1;
				border-radius: 25%;
				margin: 0;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}

	.account {
		display: flex;

		&:hover .account-avatar {
			border-color: var(--kt-primary-color);
		}

		.account-avatar {
			width: 48px;
			height: 48px;
			border-radius: 50%;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
		}
	}
}

.window {
	position: relative;
}
</style>
