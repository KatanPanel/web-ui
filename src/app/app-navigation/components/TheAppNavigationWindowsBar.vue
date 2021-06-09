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
	<div class="header">
		<ul class="items">
			<li
				v-if="!childrenUnfolded"
				key="children-folded"
				v-tooltip.bottom="'Exibir todos os filhos'"
				@click="toggleChildrenFolding()"
				@keydown.enter="toggleChildrenFolding()"
			>
				<v-icon name="unfold_more" />
			</li>
			<li
				v-else
				key="children-unfolded"
				v-tooltip.bottom="'Ocultar todos os filhos'"
				@click="toggleChildrenFolding()"
				@keydown.enter="toggleChildrenFolding()"
			>
				<v-icon name="unfold_less" />
			</li>
		</ul>
		<ul :class="{
			'children-unfolded': childrenUnfolded
		}" class="items windows">
			<AppNavigationWindowsBarItem
				v-for="window in getActiveWindows"
				:key="window.id"
				:window="window"
			/>
			<li
				v-if="getActiveWindows.length !== 0"
				class="window add"
				tabindex="0"
				title="Nova janela"
				@click="createDummyWindow"
				@keydown.enter="createDummyWindow"
			>
				<v-icon name="add" />
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { inject } from "inversify-props";
import { AppNavigationPresenter } from "@/app/app-navigation/app-navigation.presenter";
import {
	AppNavigationWindow,
	MinimizedNavigationWindowState,
	OpenNavigationWindowState
} from "@/app/app-navigation/models/app-navigation-window.model";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VDropdown from "@/app/shared/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/app/shared/components/ui/dropdown/VDropdownItem.vue";
import AppNavigationNavigationWindowIcon
	from "@/app/app-navigation/components/navigation-window/AppNavigationNavigationWindowIcon.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import AppNavigationWindowsBarItem
	from "@/app/app-navigation/components/AppNavigationWindowsBarItem.vue";

@Component({
	components: {
		AppNavigationWindowsBarItem,
		VLabel,
		AppNavigationNavigationWindowIcon,
		VDropdownItem,
		VDropdown,
		VIcon
	}
})
export default class TheAppNavigationWindowsBar extends Vue {
	childrenUnfolded = false;
	@inject()
	private readonly appNavigationPresenter!: AppNavigationPresenter;

	get getActiveWindows(): AppNavigationWindow[] {
		return this.appNavigationPresenter.getWindowsBy(
			OpenNavigationWindowState,
			MinimizedNavigationWindowState
		);
	}

	createDummyWindow(): void {
		this.appNavigationPresenter
			.createWindow(this, { name: "Nova janela" })
			.then((window) => {
				this.appNavigationPresenter.openWindow(window, this);
			});
	}

	toggleChildrenFolding(): void {
		this.childrenUnfolded = !this.childrenUnfolded;
	}
}
</script>
<style lang="scss" scoped>
.header {
	position: sticky;
	top: 0;
	z-index: 1;
	border-bottom: 1px solid var(--kt-border-color);
	justify-content: space-between;
	display: flex;
	align-items: center;
	background-color: var(--kt-background-tertiary);

	.items {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 4px 4px 0 4px;

		&:not(.windows) {
			margin: 4px 8px;

			li {
				border-radius: 50%;
				width: 32px;
				height: 32px;
				display: flex;
				align-items: center;
				justify-content: center;

				&:hover {
					cursor: pointer;
				}

				&:hover, &:focus {
					background-color: var(--kt-background-tertiary);

					svg {
						opacity: var(--kt-icon-opacity-focused)
					}
				}

				svg {
					opacity: var(--kt-icon-opacity-unfocused);
				}
			}
		}

		&.windows {
			flex-grow: 1;

			&.children-folded {
				::v-deep .children {
					visibility: visible;
				}
			}
		}
	}
}
</style>
