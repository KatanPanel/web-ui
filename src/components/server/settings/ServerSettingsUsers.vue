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
	<div class="server-settings-users">
		<p class="v--text-muted">
			{{
				$t("views.server.settings.users.info", {server: server.name})
			}}
		</p>
		<p class="v--text-muted">
			{{ $t("views.server.settings.users.click-to-modify") }}
		</p>
		<v-row class="v--m-top-4">
			<v-col :size="6">
				<small class="v--text-cute v--text-muted">
					{{
						$t("views.server.settings.users.users-count", {
							count: (users || []).length,
						})
					}}
				</small>
				<ul class="users">
					<li v-for="user in users" :key="user.id" class="user">
						<Avatar :src="user.avatar" class="user-avatar"/>
						<div class="user-info">
							<div class="user-name">{{ user.username }}</div>
						</div>
						<v-dropdown
							v-if="$clientSettings().developerMode"
							class="user-more"
						>
							<div
								v-tooltip="
									$t(
										'views.server.settings.users.more-tooltip'
									)
								"
							>
								<v-icon name="dot-horizontal"/>
							</div>
							<template v-slot:items>
								<v-dropdown-item @click="copyUserId(user)">
									{{
										$t(
											"views.server.settings.users.copy-id"
										)
									}}
								</v-dropdown-item>
							</template>
						</v-dropdown>
					</li>
				</ul>
			</v-col>
			<v-col :size="6">
				<small class="v--text-cute v--text-muted">
					{{
						$t("views.server.settings.users.roles-count", {
							count: (roles || []).length,
						})
					}}
				</small>
				<ul v-if="roles" class="users">
					<li v-for="role in users" :key="role.id" class="user">
						<div class="user-info">
							<div class="user-name">{{ role.username }}</div>
						</div>
					</li>
				</ul>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {AxiosResponse} from "axios";
import SystemAccount from "@/components/system/SystemAccount.vue";
import Avatar from "@/components/Avatar.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VDropdown from "@/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/components/ui/dropdown/VDropdownItem.vue";
import {copyValue} from "@/utils/dom";

@Component<ServerSettingsUsers>({
	components: {
		VDropdownItem,
		VDropdown,
		VIcon,
		VCol,
		VRow,
		Avatar,
		SystemAccount,
	},
	created(): void {
		this.$http("/info/accounts").then((res: AxiosResponse) => {
			this.users = res.data.data.accounts;
		});

		this.$http("/info/roles").then((res: AxiosResponse) => {
			this.roles = res.data.data.accounts;
		});
	},
})
export default class ServerSettingsUsers extends Vue {
	users: any[] | null = null;
	roles: any[] | null = null;
	@Prop({type: Object, required: true}) private readonly server!: any;

	copyUserId(user: any): void {
		copyValue(user.id);
	}
}
</script>
<style lang="scss" scoped>
.server-settings-users {
	.users {
		list-style: none;

		.user {
			display: flex;
			margin-bottom: 4px;
			border-radius: 4px;
			align-items: center;
			padding: 8px;
			margin: 0 -8px;

			&:hover {
				cursor: pointer;
				background-color: var(--kt-background-secondary);
			}

			.user-avatar {
				width: 32px;
				height: 32px;
				margin-right: 8px;
			}

			.user-info {
				flex: 1;

				.user-name {
					font-weight: 600;
				}

				.user-description {
					font-size: 12px;
				}
			}

			.user-more {
				margin-right: 8px;

				svg {
					width: 16px;
					height: 16px;
					color: var(--kt-muted-darker-color);
				}
			}
		}
	}
}
</style>
