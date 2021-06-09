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
	<v-modal>
		<template #title>Janelas</template>
		<div class="description">
			<p>
				Gerencie diversos recursos rapidamente utilizando janelas, são
				como abas de navegador.
			</p>
			<p>
				Tente criar uma para ver como funciona.
				<a href="#" target="_blank">Saiba mais</a>.
			</p>
		</div>
		<hr />
		<div
			v-if="getWindows.length === 0"
			key="no-windows"
			class="no-windows-found"
		>
			Nenhuma janela encontrada
		</div>
		<div v-else key="open-windows">
			<ul class="window-list">
				<li
					v-for="window in getWindows"
					:key="window.id"
					:class="isWindowOpen(window)"
					class="window"
				>
					<div class="action">
						<div class="name">{{ window.name }}</div>
						<div class="close" @click="closeWindow(window)">
							<v-icon name="close" />
						</div>
					</div>
					<div
						aria-hidden="true"
						class="preview-container"
						disabled="true"
						@click.prevent.stop="openWindow(window)"
					>
						<component :is="renderWindow(window)" class="preview" />
					</div>
				</li>
			</ul>
		</div>
		<v-modal-footer>
			<v-button
				:color-primary="true"
				@click="appNavigationPresenter.openCreateResourceModal()"
			>
				<v-icon name="plus" />
				Criar nova janela
			</v-button>
		</v-modal-footer>
	</v-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";
import { AppNavigationPresenter } from "@/app/app-navigation/app-navigation.presenter";
import {
	AppNavigationWindow,
	ClosedNavigationWindowState,
	MinimizedNavigationWindowState,
	OpenNavigationWindowState
} from "@/app/app-navigation/models/app-navigation-window.model";
import { inject } from "inversify-props";
import AppNavigationNavigationWindow
	from "@/app/app-navigation/components/navigation-window/AppNavigationNavigationWindow.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VModalTitle from "@/app/shared/components/ui/modal/VModalTitle.vue";
import VModalFooter from "@/app/shared/components/ui/modal/VModalFooter.vue";
import { VueConstructor } from "vue";
import VModal from "@/app/shared/components/ui/modal/VModal.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VFlexElement from "@/app/shared/components/ui/layout/VFlexElement.vue";

@Component<AppNavigationOpenWindowsModal>({
	components: {
		VFlexElement,
		VFlexBox,
		VButton,
		VLabel,
		VModal,
		VModalFooter,
		VModalTitle,
		VIcon,
		VContainer,
		AppNavigationNavigationWindow
	},
	mounted(): void {
		for (const window of this.getWindows) this.renderWindow(window);
	}
})
export default class AppNavigationOpenWindowsModal extends Vue {
	minimizedWindows: AppNavigationWindow[] | null = null;
	@inject()
	private readonly appNavigationPresenter!: AppNavigationPresenter;

	get getWindows(): AppNavigationWindow[] {
		return this.appNavigationPresenter.getWindowsBy(
			OpenNavigationWindowState,
			MinimizedNavigationWindowState
		);
	}

	get getOpenWindows(): AppNavigationWindow[] {
		return this.appNavigationPresenter.getWindowsBy(
			OpenNavigationWindowState
		);
	}

	close(): void {
		this.$emit("close");
	}

	openWindow(window: AppNavigationWindow): void {
		this.minimizedWindows = [window];
		this.$router.push(window.location);
	}

	closeWindow(window: AppNavigationWindow): void {
		this.appNavigationPresenter.updateWindow(window.id, {
			state: ClosedNavigationWindowState
		});
	}

	renderWindow(window: AppNavigationWindow): Vue {
		const component = window.getComponent() as VueConstructor;
		const content = window.instance().$refs.content as any;

		return component.extend({
			props: content.$props,
			data: () => content.$data
		});
	}

	isWindowOpen(window: AppNavigationWindow): boolean {
		return window.state === OpenNavigationWindowState;
	}
}
</script>
<style lang="scss" scoped>
.no-windows-found {
	text-align: center;
	font-size: 24px;
	color: var(--kt-muted-darker-color);
	user-select: none;
	padding: 48px 0;
}

.description {
	margin-bottom: 24px;
}

.window-list {
	display: flex;
	flex-wrap: wrap;
	margin: 0 -1%;

	.window {
		flex-basis: 31%;
		margin: 0 1% 1%;

		&:hover .action .close {
			visibility: visible;
		}

		&.active .preview-container {
			border-color: var(--kt-primary-color);
		}

		.action {
			display: flex;
			align-items: center;
			margin-bottom: 8px;
			justify-content: space-between;

			.name {
				font-size: 16px;
			}

			.close {
				visibility: hidden;

				&:hover {
					cursor: pointer;

					svg {
						fill: var(--kt-danger-color);
					}
				}

				svg {
					width: 8px;
					height: 8px;
					fill: var(--kt-muted-darker-color);
				}
			}
		}

		.preview-container {
			border: 1px solid var(--kt-border-color);
			background-color: var(--kt-background-secondary);
			height: 240px;
			padding: 12px;
			overflow: auto;

			&:hover {
				cursor: pointer;
				border-color: var(--kt-primary-color);
			}

			&::-webkit-scrollbar {
				width: 6px;
				background-color: var(--kt-scrollbar);
			}

			&::-webkit-scrollbar-track {
				border-radius: 8px;
				background-color: var(--kt-scrollbar);
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 8px;
				background-color: var(--kt-scrollbar-thumb);
			}

			.preview {
				pointer-events: none;
				user-select: none;
				zoom: 0.75;

				::v-deep {
					h1,
					h2,
					h3,
					h4,
					h5,
					h6 {
						font-size: 150%;
					}

					p {
						font-size: 75%;
					}
				}
			}
		}
	}
}
</style>
