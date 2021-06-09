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
	<div v-if="$route.name !== 'welcome'" key="panel" class="panel">
		<TheAppSidebar @logout="performLogout" />
		<div class="panel-content">
			<TheAppNavigationWindowsBar id="windows-bar" />
			<main class="panel-body">
				<router-view />
				<AppNavigationWindowsContainer />
			</main>
		</div>
		<AppPanelTour />
	</div>
	<router-view v-else key="welcome" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "@/app/shared/components/Loading.vue";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";
import { AppNavigationPresenter } from "@/app/app-navigation/app-navigation.presenter";
import { inject } from "inversify-props";
import AppNavigationNavigationWindow from "@/app/app-navigation/components/navigation-window/AppNavigationNavigationWindow.vue";
import { NavigationGuardNext, Route } from "vue-router";
import { isUndefined } from "@/app/shared/utils";
import TheAppNavigationWindowsBar from "@/app/app-navigation/components/TheAppNavigationWindowsBar.vue";
import AppNavigationWindowsContainer from "@/app/app-navigation/components/AppNavigationWindowsContainer.vue";
import { UserModel } from "@/app/user/models/user.model";
import { USER_INJECTION_KEY } from "@/app/user/user.module";
import TheAppSidebar from "@/app/shared/components/sidebar/TheAppSidebar.vue";
import AppPanelTour from "@/app/shared/views/AppPanelTour.vue";

@Component<AppPanel>({
	components: {
		AppPanelTour,
		TheAppSidebar,
		AppNavigationWindowsContainer,
		TheAppNavigationWindowsBar,
		AppNavigationNavigationWindow,
		Loading,
		VContainer
	},
	beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext): void {
		const vm = this as AppPanel;
		const open = vm.appNavigationPresenter.getOpenWindow;

		if (!isUndefined(open)) {
			vm.appNavigationPresenter.replaceWindowChildren(
				open,
				vm.appNavigationPresenter.generateWindowChildren(to)
			);
		}

		next();
	},
	beforeMount(): void {
		const vm = this as AppPanel;
		const open = vm.appNavigationPresenter.getOpenWindow;

		if (!isUndefined(open)) return;

		vm.appNavigationPresenter.createWindow(this, {}).then((window) => {
			vm.appNavigationPresenter.addWindowChildren(
				window,
				vm.appNavigationPresenter.generateWindowChildren(this.$route)
			);

			vm.appNavigationPresenter.openWindow(window, this);
		});
	}
})
export default class AppPanel extends Vue {
	@inject()
	private readonly appNavigationPresenter!: AppNavigationPresenter;

	@inject(USER_INJECTION_KEY)
	private readonly user!: UserModel;

	performLogout(): void {
		this.$router.push({ name: "auth.logout" });
	}
}
</script>
<style lang="scss" scoped>
.panel {
	display: flex;
	position: relative;
	height: 100%;

	.panel-content {
		position: relative;
		height: 100%;
		width: 100%;

		.panel-body {
			position: relative;
			margin: 3% 0;

			.panel-main-view {
				flex: 1 1 100%;
			}
		}
	}
}
</style>
