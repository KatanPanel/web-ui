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
	<section id="create-resource-window">
		<v-modal-description>
			Gerencie diversos recursos rapidamente utilizando janelas de
			aplicação, são como abas de navegador, tente criar uma para ver como
			funciona.
			<a href="#">Saiba mais</a>.
		</v-modal-description>
		<v-wall v-if="!isResourceRoute" :color-danger="true">
			<p>
				Não é possível criar janelas de aplicação a partir da sua atual
				localização. Navegue até uma rota não-protegida para continuar.
			</p>
		</v-wall>
		<v-form v-else @submit.native.prevent="confirm">
			<v-form-input-group>
				<v-form-label>Nome da janela</v-form-label>
				<v-form-input
					v-model="windowName"
					placeholder="Nova janela"
					required
				/>
			</v-form-input-group>
			<v-modal-footer>
				<v-button @click="close">Cancelar</v-button>
				<v-button
					:color-primary="true"
					:disabled="!isResourceRoute"
					:type="isResourceRoute ? 'submit' : 'button'"
				>
					Criar janela
				</v-button>
			</v-modal-footer>
		</v-form>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VFormInputGroup from "@/app/shared/components/ui/form/VFormInputGroup.vue";
import VFormLabel from "@/app/shared/components/ui/form/VFormLabel.vue";
import VFormInput from "@/app/shared/components/ui/form/VFormInput.vue";
import VModalTitle from "@/app/shared/components/ui/modal/VModalTitle.vue";
import VModalDescription from "@/app/shared/components/ui/modal/VModalDescription.vue";
import VModalFooter from "@/app/shared/components/ui/modal/VModalFooter.vue";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import { AppNavigationPresenter } from "@/app/app-navigation/app-navigation.presenter";
import { inject } from "inversify-props";
import VWall from "@/app/shared/components/ui/wall/VWall.vue";

@Component({
	components: {
		VWall,
		VButton,
		VModalFooter,
		VModalDescription,
		VModalTitle,
		VFormInput,
		VFormLabel,
		VFormInputGroup,
		VForm
	}
})
export default class AppCreateResourceModalWindowResource extends Vue {
	windowName = "";
	@inject()
	private readonly appNavigationPresenter!: AppNavigationPresenter;

	get isResourceRoute(): boolean {
		return !this.$route.matched[1].meta.windowIgnore;
	}

	close(): void {
		this.$emit("close");
	}

	confirm(): void {
		// TODO: fix this
		// this.appNavigationPresenter
		// 	.createWindow(this, {
		// 		name: this.windowName,
		// 		location: this.$router.resolve({ name: "home" }).route
		// 	})
		// 	.then((window) => this.appNavigationPresenter.openWindow(window))
		// 	.finally(() => this.close());
	}
}
</script>
