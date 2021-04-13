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
			<b>{{ $t("errors.Server Error.title") }}</b>
		</h1>
		<p>{{ $t("errors.Server Error.description") }}</p>
		<i18n path="errors.Server Error.persistence" tag="p">
			<a :href="$website.url">{{
				$t("errors.Server Error.click-here")
			}}</a>
		</i18n>
	</v-container>
	<div v-else key="loaded" class="panel">
		<transition name="v--transition-linear-slide-rl" mode="in-out">
			<PanelWindowsOverlay
				v-if="isWindowsOverlayVisible"
				ref="windows-overlay"
				@close="closeWindowsOverlay"
			/>
		</transition>
		<PanelNavigation
			:overlay-visibility="isWindowsOverlayVisible"
			@update:switch="toggleWindowsOverlay"
		/>
		<div :disabled="isWindowsOverlayVisible" class="panel-view">
			<router-view v-if="getOpenWindows.length === 0" key="panel-view" />
			<PanelServerWindowContainer
				v-show="getOpenWindows.length > 0"
				key="windows-view"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ROOT_MODULE } from "@/store";
import VContainer from "@/components/ui/layout/VContainer.vue";
import Loading from "@/components/Loading.vue";
import { commit } from "@/utils/vuex";
import { AxiosResponse } from "axios";
import { UPDATE_BACKEND_INFO } from "@/store/mutations";
import { hasTabKeyPressed } from "@/utils/dom";
import { NavigationGuardNext, Route } from "vue-router";
import PanelWindowsOverlay from "@/components/panel/PanelWindowsOverlay.vue";
import PanelNavigation from "@/components/panel/PanelNavigation.vue";
import {
	getWindowsBy,
	OpenWindowState,
	Window,
} from "@/common/navigation/window";
import PanelServerWindowContainer from "@/components/panel/PanelServerWindowContainer.vue";

@Component<Panel>({
	components: {
		PanelServerWindowContainer,
		PanelNavigation,
		PanelWindowsOverlay,
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
	beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext): void {
		const vm = this as Panel;
		vm.closeWindowsOverlay();
		next();
	},
})
export default class Panel extends Vue {
	loading = true;
	error = false;
	isWindowsOverlayVisible = false;

	get getOpenWindows(): Window[] {
		return getWindowsBy(OpenWindowState);
	}

	toggleWindowsOverlay(): void {
		this.isWindowsOverlayVisible = !this.isWindowsOverlayVisible;
	}

	closeWindowsOverlay(e?: Event): void {
		if (e && (e.target as HTMLElement) !== this.$refs["windows-overlay"])
			return;

		this.isWindowsOverlayVisible = false;
	}

	onTabKeyDown(e: KeyboardEvent): void {
		if (hasTabKeyPressed(e)) e.preventDefault();
	}

	onTabKeyUp(e: KeyboardEvent): void {
		if (hasTabKeyPressed(e)) this.toggleWindowsOverlay();
	}
}
</script>
<style lang="scss" scoped>
.panel {
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
</style>
