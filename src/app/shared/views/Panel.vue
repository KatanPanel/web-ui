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
	<div class="panel">
		<TheSidebar @logout="performLogout" />
		<div class="panel-content">
			<!-- <v-container
				v-if="loading"
				key="loading"
				class="v--flex v--flex-justify-center v--flex-column v--full-height"
			>
				<Loading />
			</v-container>
			<v-container
				v-else-if="error"
				key="error"
				class="v--flex v--flex-justify-center v--flex-column v--full-height v--text-align-center"
			>
				<h1>
					<b>{{ $t("errors.Server Error.title") }}</b>
				</h1>
				<p>{{ $t("errors.Server Error.description") }}</p>
				<i18n path="errors.Server Error.persistence" tag="p">
					<a :href="$website.url">{{
						$t("errors.Server Error.click-here")
					}}</a>
				</i18n>
			</v-container> -->
			<div class="panel-body">
				<transition name="v--transition-linear-slide-rl" mode="in-out">
					<NavigationWindowsOverlay
						v-if="isWindowsOverlayVisible"
						@close="closeWindowsOverlay"
						ref="windows-overlay"
					/>
				</transition>
				<TheNavigationTopBar
					:overlay-visibility.sync="isWindowsOverlayVisible"
					@logout="performLogout"
				/>
				<div :disabled="isWindowsOverlayVisible" class="panel-view">
					<router-view
						v-if="appNavigationStore.getOpenWindows.length === 0"
						key="panel-view"
					/>
					<PanelServerWindowContainer
						v-show="appNavigationStore.getOpenWindows.length > 0"
						key="windows-view"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { NavigationGuardNext, Route } from "vue-router";
import { lazyComponent } from "@/app/shared/utils/builtin";
import PanelServerWindowContainer
	from "@/app/shared/components/navigation/PanelServerWindowContainer.vue";
import TheSidebar from "@/app/shared/components/TheSidebar.vue";
import Loading from "@/app/shared/components/Loading.vue";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";
import TheNavigationTopBar from "@/app/shared/components/TheNavigationTopBar.vue";
import NavigationWindowsOverlay
	from "@/app/shared/components/navigation/NavigationWindowsOverlay.vue";
import { AppNavigationStore } from "@/app/shared/store/navigation";
import { hasTabKeyPressed } from "@/app/shared/utils/dom";
import { inject } from "inversify-props";

@Component<Panel>({
	components: {
		TheSidebar,
		PanelServerWindowContainer,
		TheNavigationTopBar,
		NavigationWindowsOverlay,
		Loading,
		VContainer
	},
	beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext): void {
		const vm = this as Panel;
		vm.closeWindowsOverlay();
		next();
	},
	mounted(): void {
		const vm = this as Panel;
		document.addEventListener("keyup", vm.onTabKeyUp);
		document.addEventListener("keydown", vm.onTabKeyDown);
	},
	destroyed(): void {
		const vm = this as Panel;
		document.removeEventListener("keyup", vm.onTabKeyUp);
		document.removeEventListener("keydown", vm.onTabKeyDown);
	}
})
export default class Panel extends Vue {
	@inject()
	private readonly appNavigationStore!: AppNavigationStore;

	isWindowsOverlayVisible = false;

	private toggleWindowsOverlay(): void {
		this.isWindowsOverlayVisible = !this.isWindowsOverlayVisible;
	}

	private closeWindowsOverlay(e?: Event): void {
		if (e && (e.target as HTMLElement) !== this.$refs["windows-overlay"])
			return;

		this.isWindowsOverlayVisible = false;
	}

	private performLogout(): void {
		this.$modal.show(
			lazyComponent("auth/LogoutModal"),
			{},
			{ height: "auto", width: "30%" }
		);
	}

	public onTabKeyDown(e: KeyboardEvent): void {
		if (hasTabKeyPressed(e)) e.preventDefault();
	}

	public onTabKeyUp(e: KeyboardEvent): void {
		if (hasTabKeyPressed(e)) this.toggleWindowsOverlay();
	}
}
</script>
<style lang="scss" scoped>
.panel {
	display: flex;
	flex-direction: row !important; // override #app
	background-color: var(--kt-background);
	color: var(--kt-text-color);
	position: relative;

	.panel-body {
		display: flex;
		flex-direction: row-reverse;
		position: relative;
		flex-wrap: wrap;
		align-items: flex-start;

		.panel-view {
			flex: 1;
			transition: filter linear 0.15s;

			&[disabled] {
				filter: blur(4px);
			}
		}
	}

	.panel-content {
		position: relative;
		flex: 1;
		padding: 36px 48px;
		max-width: 100%;
		min-height: 100vh;
	}

	.server-selector {
		position: fixed;
		color: black;
		z-index: 1001;
		height: 100%;
		box-shadow: rgba(0, 0, 0, 0.12) 0 0 8px 2px;

		ul {
			list-style-type: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			li {
				&:not(:last-child) {
					border-bottom: 2px solid var(--kt-background-tertiary);
				}

				a {
					text-decoration: none;
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 24px;

					&:hover {
						background-color: var(--kt-background-tertiary);
					}

					.server-info {
						line-height: 1;
						margin-left: 12px;

						.server-ip {
							font-size: 12px;
							color: var(--kt-muted-color);
						}
					}
				}

				.server-icon {
					&:not(.selected):hover img {
						filter: none;
					}

					&:not(.selected) img {
						// filter: grayscale(1);
					}
				}

				.server-icon,
				.server-icon img {
					width: 40px;
					height: 40px;
				}
			}
		}
	}
}
</style>
