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
	<section id="server-settings-roles">
		<h4 v-text="$t('views.server.settings.roles.title')" />
		<hr />
		<ul v-if="roles !== null">
			<ServerSettingsRolesRoleItem
				v-for="role in roles"
				:key="role.id"
				:role="role"
			/>
		</ul>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RoleModel } from "@/app/role/models/role.model";
import { inject } from "inversify-props";
import { RoleService } from "@/app/role/services/role.service";
import ServerSettingsRolesRoleItem
	from "@/app/server/components/settings/ServerSettingsRolesRoleItem.vue";

@Component<ServerSettingsRoles>({
	components: { ServerSettingsRolesRoleItem },
	created(): void {
		this.roleService.listRoles().then((roles) => {
			this.roles = roles;
		});
	}
})
export default class ServerSettingsRoles extends Vue {
	roles: RoleModel[] | null = null;
	@inject()
	private readonly roleService!: RoleService;
}
</script>
