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
						<v-input :value="account.id" readonly="true" />
					</v-input-group>
				</v-col>
				<v-col :size="6">
					<v-input-group>
						<v-label>Nome de usuário</v-label>
						<v-input
							:value="account.username"
							:placeholder="account.username"
						/>
					</v-input-group>
				</v-col>
			</v-row>
			<v-row class="v--m-top-2">
				<v-col :size="12">
					<v-label>E-mail</v-label>
					<v-input
						:value="account.email"
						:placeholder="
							account.email || `${account.username}@katan.com`
						"
					/>
				</v-col>
			</v-row>
		</v-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { generateMetaInfo } from "@/utils/component";
import VForm from "@/components/ui/form/VForm.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VInput from "@/components/ui/form/VInput.vue";
import { get } from "@/utils/vuex";
import { AUTH_MODULE } from "@/store";
import { GET_ACCOUNT } from "@/store/modules/auth/getters";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";

@Component({
	components: { VCol, VRow, VInput, VLabel, VInputGroup, VForm },
	metaInfo(): MetaInfo {
		return generateMetaInfo("my-account.my-account");
	},
})
export default class MyAccountDetails extends Vue {
	get account(): any {
		return get(AUTH_MODULE, GET_ACCOUNT);
	}
}
</script>
