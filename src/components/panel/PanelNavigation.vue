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
		<v-popover
			:disabled="overlayVisibility"
			placement="bottom"
			trigger="hover"
		>
			<li
				v-close-popover
				:active="overlayVisibility"
				@click="$emit('update:switch')"
			>
				<span v-if="!overlayVisibility" key="active-windows">
					<v-icon name="algorithm" />
				</span>
				<span v-else key="hidden-windows">
					<v-icon name="close-circle" />
				</span>
			</li>
			<template #popover> Janelas </template>
		</v-popover>
		<li class="account">
			<div class="info">
				<span class="username">{{ account.username }}</span>
			</div>
			<a href="#">
				<Avatar :src="account.avatar" />
			</a>
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
		width: 48px;
		height: 48px;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&:not(:last-child) {
			margin-right: 24px;
		}

		svg {
			fill: var(--kt-primary-color);
		}

		&[active] {
			svg {
				fill: var(--kt-danger-color);
			}

			&::before {
				background-color: var(--kt-danger-color);
			}
		}

		&:hover {
			cursor: pointer;

			&::before {
				opacity: 0.18;
			}
		}

		&:not(.account)::before {
			content: "";
			position: absolute;
			background-color: var(--kt-primary-color);
			opacity: 0.12;
			width: 48px;
			height: 48px;
			z-index: -1;
			border-radius: 25%;
			margin: 0;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.account {
		.avatar {
			width: 48px;
			height: 48px;
		}
	}
}
</style>
