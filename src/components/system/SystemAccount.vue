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
	<div class="account" @click="visible = !visible">
		<div class="account-info">
			<div class="account-basics">
				<Avatar :src="account.avatar" class="account-avatar" />
				<div class="account-name">
					{{ account.username }}
					<div>
						<div v-if="isDeveloperModeEnabled" class="v--m-right-2">
							<small>
								<Copyable :copy-value="account.id">
									<code class="v--text-muted-darker">{{
										account.id
									}}</code>
								</Copyable>
							</small>
						</div>
						<small v-else>
							<span
								v-if="!account.role"
								key="account-without-role"
								class="v--text-muted"
							>
								{{
									$t("views.system.accounts.field.last_seen")
								}}:
								<span
									v-if="account['last_login']"
									key="known-last-login"
									>{{
										$time(account["last_login"]).format(
											"LLLL"
										)
									}}</span
								>
								<span
									v-else
									key="unknown-last-login"
									class="v--text-muted"
									>{{
										$t(
											"views.system.accounts.field.unknown_last_seen"
										)
									}}</span
								>
							</span>
							<span
								v-else
								key="account-with-role"
								class="v--cursor-default"
								>{{ account.role.name }}</span
							>
						</small>
					</div>
				</div>
			</div>
			<div class="account-caret">
				<div v-if="visible" key="hide">
					<v-icon name="caret-up" />
				</div>
				<div v-else key="show">
					<v-icon name="caret-down" />
				</div>
			</div>
		</div>
		<div v-show="visible" class="account-content" @click.stop>
			<v-box :outlined="true">
				<v-box-body>
					<v-row>
						<v-col :size="6">
							<v-label
								>{{
									$t("views.system.accounts.field.username")
								}}
							</v-label>
							<p>
								{{ account.username }}
							</p>
						</v-col>
						<v-col :size="6">
							<v-label
								>{{ $t("views.system.accounts.field.role") }}
							</v-label>
							<p>
								<span
									v-if="!account.role"
									key="account-without-role"
									class="v--text-muted"
								>
									<i>{{
										$t("views.system.accounts.no-role")
									}}</i>
								</span>
								<span
									v-else
									key="account-with-role"
									class="v--user-select-text"
									>{{ account.role.name }}</span
								>
							</p>
						</v-col>
					</v-row>
					<v-row class="v--m-top-3">
						<v-col :size="6">
							<v-label
								>{{
									$t(
										"views.system.accounts.field.registration_date"
									)
								}}
							</v-label>
							<p
								v-text="
									$time(account['registered_at']).format(
										'LLLL'
									)
								"
							/>
						</v-col>
						<v-col :size="6">
							<v-label
								>{{
									$t("views.system.accounts.field.last_seen")
								}}
							</v-label>
							<p>
								<span
									v-if="account['last_login']"
									key="known-last-login"
									>{{
										$time(account["last_login"]).format(
											"LLLL"
										)
									}}</span
								>
								<span
									v-else
									key="unknown-last-login"
									class="v--text-muted"
									>{{
										$t(
											"views.system.accounts.field.unknown_last_seen"
										)
									}}</span
								>
							</p>
						</v-col>
					</v-row>
					<v-flex-box class="v--flex-justify-end v--m-top-4">
						<v-button
							:link="true"
							:primary="true"
							:to="{
								name: 'system.accounts.account',
								params: {
									accountId: account.id,
								},
							}"
						>
							{{
								$t("views.system.accounts.see-more", {
									username: account.username,
								})
							}}
						</v-button>
					</v-flex-box>
				</v-box-body>
			</v-box>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Copyable from "@/components/Copyable.vue";
import PermissionList from "@/components/PermissionList.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import PermissionValue from "@/components/PermissionValue.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VButton from "@/components/ui/button/VButton.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import Avatar from "@/components/Avatar.vue";
import { getClientSettings } from "@/common/client-settings";

@Component<SystemAccount>({
	components: {
		Avatar,
		VFlexBox,
		VButton,
		VBoxBody,
		VBox,
		PermissionValue,
		VIcon,
		VLabel,
		VCol,
		VRow,
		PermissionList,
		Copyable,
	},
})
export default class SystemAccount extends Vue {
	@Prop({ type: Object, required: true }) private readonly account!: any;
	private visible = false;

	get isDeveloperModeEnabled(): boolean {
		return getClientSettings().developerMode;
	}
}
</script>
<style lang="scss" scoped>
.account {
	border: 1px solid var(--kt-border-color);
	border-radius: 4px;
	background-color: var(--kt-background-secondary);

	&:hover {
		cursor: pointer;
	}

	.account-content {
		cursor: auto;
		user-select: auto;
	}

	.account-info {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;

		.account-basics {
			display: flex;
			align-items: center;
			padding: 8px;
			flex: 1;

			.account-name {
				line-height: 1.1;

				.account-role {
					font-size: 12px;
					color: var(--kt-muted-color);
				}
			}

			.account-avatar {
				width: 40px;
				height: 40px;
				box-shadow: inset var(--kt-shadow) 0 0 8px -1px;
				border-radius: 50%;
				margin-right: 16px;
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center;
			}
		}

		.account-caret {
			padding: 8px 16px;

			&:hover {
				cursor: pointer;

				svg {
					fill: var(--kt-muted-color);
				}
			}

			svg {
				width: 16px;
				height: 16px;
				fill: var(--kt-muted-darker-color);
			}
		}
	}

	.v--box {
		background-color: var(--kt-background-tertiary);
	}
}
</style>
