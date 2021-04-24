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
	<v-row class="system-accounts">
		<v-col :size="9">
			<h1 class="v--m-bottom-2">
				<b>{{ $t("views.system.accounts.title") }}</b>
			</h1>
			<p class="v--text-muted">
				{{ $t("views.system.accounts.description") }}
			</p>
			<br />
			<small class="v--text-cute v--text-primary">
				{{ $t("views.system.accounts.server-permissions") }}
			</small>
			<p class="v--text-muted">
				{{ $t("views.system.accounts.server-description") }}
			</p>
			<hr />
			<section id="filtering">
				<v-row>
					<v-col :size="4">
						<v-select
							:options="[
								{
									id: 'sort-az',
									value: $t(
										'views.system.accounts.sorting.a-z'
									),
									active: true
								},
								{
									id: 'sort-za',
									value: $t(
										'views.system.accounts.sorting.z-a'
									)
								}
							]"
							@change="sortAccounts"
						/>
					</v-col>
					<v-col :size="8">
						<v-input-group :inlined="true">
							<v-input-icon name="search" />
							<v-input
								v-model.trim="search"
								:placeholder="
									$t('views.system.accounts.search')
								"
								maxlength="64"
								@input="searchAccounts"
							/>
						</v-input-group>
					</v-col>
				</v-row>
			</section>
			<section id="accounts">
				<v-flex-box class="v--flex-justify-space-between v--m-top-4">
					<small class="v--text-cute">
						<span
							v-if="search.length !== 0"
							key="searching-account"
						>
							<i18n path="views.system.accounts.searching">
								<template v-slot:value>{{ search }}</template>
							</i18n>
						</span>
						<span v-else key="all-accounts">
							{{
								$t("views.system.accounts.all-accounts", {
									count: preservedAccounts.length
								})
							}}
						</span>
					</small>
				</v-flex-box>
				<p
					v-if="search.length !== 0"
					class="v--text-muted v--m-bottom-2"
				>
					{{
						$t("views.system.accounts.results-found", {
							value: accounts.length
						})
					}}
				</p>
				<v-field-list>
					<div v-if="accounts.length !== 0">
						<transition-group name="v--transition-fast-list">
							<!--
								we need a container here so that the list transitions
								do not apply to the VField, since it has no transition.
							-->
							<div
								v-for="account in accounts"
								:key="account.id"
								class="v--transition-fast-list-item account-item"
							>
								<SystemAccount :account="account" />
							</div>
						</transition-group>
					</div>
				</v-field-list>
			</section>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import { MetaInfo } from "vue-meta";
import { generateMetaInfo } from "@/utils/component";
import { AxiosResponse } from "axios";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import VForm from "@/components/ui/form/VForm.vue";
import VInput from "@/components/ui/form/VInput.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VSelect from "@/components/ui/form/VSelect.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import Copyable from "@/components/shared/Copyable.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VWall from "@/components/ui/wall/VWall.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import PermissionList from "@/components/modules/panel/shared/PermissionList.vue";
import SystemAccount from "@/components/modules/panel/system/SystemAccount.vue";

@Component<SystemAccounts>({
	components: {
		SystemAccount,
		PermissionList,
		VBoxHeader,
		VWall,
		VBoxBody,
		VBox,
		Copyable,
		VLabel,
		VFlexBox,
		VSelect,
		VIcon,
		VInputIcon,
		VInputGroup,
		VInput,
		VForm,
		VField,
		VFieldList,
		VCol,
		VRow
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo("system.accounts");
	},
	beforeMount(): void {
		this.$http("/info/accounts").then((res: AxiosResponse) => {
			const value = res.data.data.accounts;
			this.accounts = value;
			this.preservedAccounts = value;
		});
	},
	// use `beforeCreate` here for permissions to be visible to child components
	beforeCreate(): void {
		this.$http("/info/permissions").then((res: AxiosResponse) => {
			this.permissions = res.data.data.permissions;
		});
	}
})
export default class SystemAccounts extends Vue {
	// visible to SystemAccount
	public permissions: any[] = [];
	private accounts: any[] = [];
	private preservedAccounts: any[] = [];
	private search = "";

	sortAccounts(value: any) {
		switch (value.id) {
			case "sort-az": {
				this.accounts.sort((a, b) =>
					a.username.localeCompare(b.username)
				);
				break;
			}
			case "sort-za": {
				this.accounts.sort((a, b) =>
					b.username.localeCompare(a.username)
				);
				break;
			}
		}
	}

	searchAccounts() {
		const search = this.search;
		if (search.length === 0) this.accounts = this.preservedAccounts;
		else
			this.accounts = this.preservedAccounts.filter((account: any) =>
				account.username.match(new RegExp(search, "gi"))
			);
	}
}
</script>
<style lang="scss">
.system-accounts {
	.account-item {
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 6px;
		}
	}
}
</style>
