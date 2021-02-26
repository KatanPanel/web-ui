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
	<div class="panel-account">
		<h1>
			<b>{{ $t("header.panel.account") }}</b>
		</h1>
		<section id="details">
			<v-row>
				<v-col :size="6">
					<v-box class="v--box-outlined">
						<v-box-body>
							<v-row>
								<v-col :size="6">
									<v-label>Nome de usuário</v-label>
									<p>{{ getAccount.username }}</p>
								</v-col>
								<v-col :size="6">
									<v-label>Cargo</v-label>
									<p v-if="getAccount.role" key="role">
										{{ getAccount.role.name }}
									</p>
									<p
										v-else
										key="no-role"
										class="v--text-muted"
									>
										<i
											>Nenhum cargo foi definido para sua
											conta.</i
										>
									</p>
								</v-col>
							</v-row>
							<v-row class="v--m-top-4">
								<v-col :size="6">
									<v-label>Código de Identificação</v-label>
									<p>
										<code>{{
											getAccount.id.replaceAll("-", "")
										}}</code>
									</p>
								</v-col>
								<v-col :size="6">
									<v-label>Data de registro</v-label>
									<p>{{ getAccount["registered_at"] }}</p>
								</v-col>
							</v-row>
							<v-row class="v--m-top-4">
								<v-col :size="12">
									<v-button
										class="v--button-danger v--button-flat"
										>Editar informações</v-button
									>
								</v-col>
							</v-row>
						</v-box-body>
					</v-box>
					<hr />
				</v-col>
			</v-row>
		</section>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import { mixins } from "vue-class-component";
import { AuthMixin } from "@/common/internal/mixins/auth";
import VLabel from "@/components/ui/form/VLabel.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VButton from "@/components/ui/button/VButton.vue";

@Component({
	components: {
		VButton,
		VIcon,
		VCol,
		VRow,
		VBoxBody,
		VLabel,
		VBoxHeader,
		VBox,
		VContainer,
	},
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("titles.panel.account") as string,
		};
	},
})
export default class Account extends mixins(AuthMixin) {}
</script>
