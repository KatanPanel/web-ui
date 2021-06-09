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
	<section id="server-settings-users">
		<h4 v-text="$t('views.server.settings.roles.title')" />
		<hr />
		<ul v-if="users !== null">
			<ServerSettingsUsersUserItem
				v-for="user in users"
				:key="user.id"
				:user="user"
			/>
		</ul>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ServerSettingsUsersUserItem from "@/app/server/components/settings/ServerSettingsUsersUserItem.vue";
import { inject } from "inversify-props";
import { UserService } from "@/app/user/services/user.service";

@Component<ServerSettingsUsers>({
	components: {
		ServerSettingsUsersUserItem
	},
	created(): void {
		this.userService.listUsers().then((users) => {
			this.users = users;
		});
	}
})
export default class ServerSettingsUsers extends Vue {
	users: any[] | null = null;
	@inject()
	private readonly userService!: UserService;
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
