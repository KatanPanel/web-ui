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
					<small class="v--text-uppercase v--text-fw-800"
						>Janelas ativas – {{ getOpenWindows.length }}</small
					>
					<ul class="window-list v--m-bottom-3">
						<li
							:key="window.windowId"
							v-for="window in getOpenWindows"
							class="window-item"
							:active="true"
							@click="closeWindow(window.windowId)"
						>
							<PanelServerWindow :window="window.windowId" />
						</li>
					</ul>

					<small class="v--text-uppercase v--text-fw-800"
						>Outras janelas – {{ getClosedWindows.length }}</small
					>
					<ul class="window-list">
						<router-link
							:key="window.windowId"
							:active="window.isOpen"
							:to="window.getLocation()"
							v-for="window in getClosedWindows"
							@click.native="
								openWindow(window) + closeShowingWindows()
							"
							tag="li"
							class="window-item"
						>
							<a
								><PanelServerWindow :window="window.windowId"
							/></a>
						</router-link>
					</ul>
				</div>
			</div>
		</transition>
		<ul class="navigation">
			<li
				@click="showingWindows = !showingWindows"
				v-tooltip="{
					content: showingWindows ? '' : 'Janelas em segundo plano',
					placement: 'bottom',
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
			<router-link
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
			</router-link>
		</ul>
		<div class="panel-view" :disabled="showingWindows">
			<router-view v-if="getOpenWindows.length === 0" key="panel-view" />
			<PanelServerContainer
				v-show="getOpenWindows.length > 0"
				key="windows-view"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { AUTH_TOKEN_KEY } from "@/store/auth";
import { AUTH_MODULE } from "@/store";
import { AUTH_VERIFY } from "@/store/auth/actions";
import VContainer from "@/components/ui/layout/VContainer.vue";
import Loading from "@/components/Loading.vue";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { mixins } from "vue-class-component";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import ServerContainer from "@/components/server/ServerContainer.vue";
import ServerWindow from "@/components/server/ServerWindow.vue";
import { dispatch } from "@/utils/vuex";
import { AppMixin } from "@/mixins/app";
import { AuthMixin } from "@/mixins/auth";

@Component({
	components: {
		PanelServerWindow: ServerWindow,
		PanelServerContainer: ServerContainer,
		VLabel,
		VIcon,
		TheBreadcrumb,
		Loading,
		VContainer,
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

	mounted(): void {
		this.$http
			.get("/")
			.then(() => (this.error = false))
			.catch(() => (this.error = true))
			.finally(() => (this.loading = false));
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
	margin-left: 140px;

	.windows {
		position: fixed;
		background-color: var(--primary-color);
		color: var(--inverse-color);
		right: 0;
		height: 100%;
		border-top-left-radius: 10%;
		border-bottom-left-radius: 10%;
		padding: 48px;
		z-index: 1001;
		box-shadow: var(--primary-color) -2px 0 8px 0;
		min-width: 30%;

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
	right: 0;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	z-index: 1;

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
				fill: var(--primary-color);
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
				background-color: var(--primary-color);
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
			border-color: var(--primary-color);
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
