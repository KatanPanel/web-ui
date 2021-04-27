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
	<div>
		<h4 class="v--m-bottom-4">Minha conta</h4>
		<v-form>
			<v-row>
				<v-col :size="6">
					<v-input-group>
						<v-label>ID da conta</v-label>
						<v-input :value="authStore.account.id"
								 readonly="true" />
					</v-input-group>
				</v-col>
				<v-col :size="6">
					<v-input-group>
						<v-label>Nome de usuário</v-label>
						<v-input
							:placeholder="authStore.account.username"
							:value="authStore.account.username"
						/>
					</v-input-group>
				</v-col>
			</v-row>
			<v-row class="v--m-top-2">
				<v-col :size="12">
					<v-label>E-mail</v-label>
					<v-input
						:placeholder="
							authStore.account.email ||
							`${authStore.account.username}@katan.com`
						"
						:value="authStore.account.email"
					/>
				</v-col>
			</v-row>
		</v-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { AuthStore } from "@/app/auth/auth.store";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VInputGroup from "@/app/shared/components/ui/form/VInputGroup.vue";
import VInput from "@/app/shared/components/ui/form/VInput.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import { inject } from "inversify-props";

@Component({
	components: { VCol, VRow, VInput, VLabel, VInputGroup, VForm },
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "my-account.my-account");
	}
})
export default class MyAccountDetails extends Vue {
	@inject()
	private readonly authStore!: AuthStore;
}
</script>
