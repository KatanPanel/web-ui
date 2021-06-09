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
		<template #title> Fechar {{ window.name }}</template>
		<p>
			{{ window.name }} possui mais de uma instância ativa, tem certeza
			que deseja fecha-la?
		</p>
		<p>
			Tudo o que você fez será perdido. Você pode optar por remover uma
			das instâncias ao invés do remove-la por completo.
		</p>
		<div class="instances">
			<v-label>Instâncias ativas ({{ window.children.length }})</v-label>
			<p>Clique em uma instância para navegar até ela.</p>
			<ul class="instance-list">
				<li
					v-for="instance in window.children"
					:key="instance.location.name"
					:class="{ active: instance.isActive }"
					class="instance"
					tabindex="0"
					@click="navigateToInstance(instance)"
					@keydown.enter="navigateToInstance(instance)"
				>
					{{ $t(`navigation.windows.${instance.location.name}`) }}
					<div
						class="close"
						tabindex="0"
						@click.stop="closeInstance(instance)"
					>
						<v-icon name="close" />
					</div>
				</li>
			</ul>
		</div>
		<template #footer>
			<v-button @click="close">Cancelar</v-button>
			<v-button :color-danger="true" @click="confirm">Confirmar</v-button>
		</template>
	</v-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppNavigationPresenter } from "@/app/app-navigation/app-navigation.presenter";
import {
	AppNavigationWindow,
	AppNavigationWindowChildren
} from "@/app/app-navigation/models/app-navigation-window.model";
import { inject } from "inversify-props";
import VModal from "@/app/shared/components/ui/modal/VModal.vue";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import VWall from "@/app/shared/components/ui/wall/VWall.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";

@Component({
	components: { VIcon, VWall, VLabel, VButton, VModal }
})
export default class AppNavigationWindowCloseModal extends Vue {
	@Prop({ type: Object, required: true })
	private readonly window!: AppNavigationWindow;

	@inject()
	private readonly appNavigationPresenter!: AppNavigationPresenter;

	closeInstance(instance: AppNavigationWindowChildren): void {
		instance.isActive = false;
		this.appNavigationPresenter.removeWindowChildren(this.window, instance);

		if (this.window.children.length === 0) {
			this.appNavigationPresenter.updateWindow(this.window, {
				location: undefined
			});
			this.close();
			return;
		}

		this.$router
			.push(this.window.children[0].location)
			.then(() => this.close());
	}

	navigateToInstance(instance: AppNavigationWindowChildren): void {
		if (instance.isActive) {
			this.close();
			return;
		}

		this.$router.push(instance.location).then(() => {
			this.close();
		});
	}

	close(): void {
		this.$emit("close");
	}

	confirm(): void {
		this.appNavigationPresenter.closeWindow(this.window);
		this.close();
	}
}
</script>
<style lang="scss" scoped>
.instances {
	margin-top: 18px;

	.instance-list {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 18px 0;

		.instance {
			position: relative;
			margin: 0 8px;
			color: var(--kt-muted-color);
			border: 1px solid var(--kt-border-color);
			padding: 48px;
			font-size: 20px;
			user-select: none;
			flex-grow: 1;
			text-align: center;

			&:hover {
				cursor: pointer;

				.close {
					visibility: visible;
				}
			}

			&:hover:not(.active),
			&:focus {
				border-color: var(--kt-border-accent);
			}

			&.active {
				border-color: var(--kt-primary-color);
			}

			.close {
				position: absolute;
				right: 0;
				top: 0;
				margin: 6px;
				width: 20px;
				height: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 4px;
				visibility: hidden;

				&:hover {
					background-color: var(--kt-background-tertiary);

					svg {
						fill: currentColor;
					}
				}

				svg {
					fill: var(--kt-muted-darker-color);
					width: 8px;
					height: 8px;
				}
			}
		}
	}
}
</style>
