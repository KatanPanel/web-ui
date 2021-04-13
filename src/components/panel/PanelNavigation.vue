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
	<ul class="panel-navigation">
		<li @click="$emit('update:switch')">
			<v-popover
				:disabled="overlayVisibility"
				placement="bottom"
				trigger="hover"
			>
				<a href="#">
					<v-icon name="layers" />
				</a>
				<template #popover> Janelas</template>
			</v-popover>
		</li>
		<li v-tooltip="account.username" class="account">
			<router-link :to="{ name: 'account' }">
				<Avatar :src="account.avatar" />
			</router-link>
		</li>
	</ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VIcon from "@/components/ui/icon/VIcon.vue";
import { AUTH_MODULE } from "@/store";
import { GET_ACCOUNT } from "@/store/modules/auth/getters";
import { get } from "@/utils/vuex";
import Avatar from "@/components/Avatar.vue";

@Component({
	components: { Avatar, VIcon },
})
export default class PanelNavigation extends Vue {
	@Prop({ type: Boolean, required: true })
	private readonly overlayVisibility!: boolean;

	get account(): any {
		return get(AUTH_MODULE, GET_ACCOUNT);
	}
}
</script>
<style lang="scss" scoped>
.panel-navigation {
	position: relative;
	display: flex;
	align-items: center;
	z-index: 1;

	li {
		position: relative;
		z-index: 0;
		list-style: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-left: 24px;

		svg {
			opacity: 0.54;
		}
	}

	.account {
		.avatar {
			width: 40px;
			height: 40px;
		}
	}
}
</style>
