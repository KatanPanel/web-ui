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
	<section id="create-resource-server">
		<v-form>
			<v-row>
				<v-col :size="3">
					<div class="server-icon">
						<Avatar class="server-icon-source" />
					</div>
				</v-col>
				<v-col :size="9">
					<v-form-input-group>
						<v-form-label> Nome do servidor </v-form-label>
						<v-form-input placeholder="Meu servidor" required />
					</v-form-input-group>
					<v-form-input-group>
						<v-form-label> Jogo </v-form-label>
						<v-select :options="gameOptions" />
					</v-form-input-group>
				</v-col>
			</v-row>
			<v-modal-footer>
				<v-button @click="close">Cancelar</v-button>
				<v-button :color-primary="true" type="submit">
					Criar servidor
				</v-button>
			</v-modal-footer>
		</v-form>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VModalTitle from "@/app/shared/components/ui/modal/VModalTitle.vue";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VFormInputGroup from "@/app/shared/components/ui/form/VFormInputGroup.vue";
import VFormLabel from "@/app/shared/components/ui/form/VFormLabel.vue";
import VFormInput from "@/app/shared/components/ui/form/VFormInput.vue";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";
import Avatar from "@/app/shared/components/Avatar.vue";
import VSelect, {
	SelectOption
} from "@/app/shared/components/ui/form/VSelect.vue";
import VModalFooter from "@/app/shared/components/ui/modal/VModalFooter.vue";
import VButton from "@/app/shared/components/ui/button/VButton.vue";

@Component({
	components: {
		VButton,
		VModalFooter,
		VSelect,
		Avatar,
		VCol,
		VRow,
		VModalTitle,
		VFormInput,
		VFormLabel,
		VFormInputGroup,
		VForm
	}
})
export default class AppCreateResourceModalServerResource extends Vue {
	gameOptions: SelectOption[] = [
		{
			id: "minecraft",
			value: "Minecraft"
		}
	];

	close(): void {
		this.$emit("close");
	}
}
</script>
<style lang="scss" scoped>
.server-icon {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;

	&:hover {
		cursor: pointer;
	}

	.server-icon-source {
		width: 120px;
		height: 120px;
	}
}
</style>
