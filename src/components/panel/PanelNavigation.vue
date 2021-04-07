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
	<div class="panel-navigation">
		<ul class="context-switcher">
			<li
				v-tooltip="{
					content: overlayVisibility ? '' : '[TAB] Tarefas',
					placement: 'bottom',
				}"
				:active="overlayVisibility"
				@click="$emit('k-switch')"
			>
				<span v-if="!overlayVisibility" key="active-windows">
					<v-icon name="algorithm"/>
				</span>
				<span v-else key="hidden-windows">
					<v-icon name="close-circle"/>
				</span>
			</li>
			<!-- <router-link
				:to="{ name: 'panel.account' }"
				tag="li"
				class="account"
			>
				<a
					class="account"
					v-tooltip="{
					content: getAccount.username,
					placement: 'bottom',
				}"
				>
					<div
						class="account-avatar"
						:style="{
						'background-image':
							'url(https://images-ext-2.discordapp.net/external/Bhe4P3WRPvIUt2ct3c8Nl2LsswWVdUk5qC4O8PgY_28/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/730099264335773797/82767c6e44e631bae8bf1b98355cd3d8.png?width=590&height=590)',
					}"
					/>
				</a>
			</router-link> -->
		</ul>
	</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import VIcon from "@/components/ui/icon/VIcon.vue";

@Component({
	components: {VIcon},
})
export default class PanelNavigation extends Vue {
	@Prop({type: Boolean, required: true})
	private readonly overlayVisibility!: boolean;
}
</script>
<style lang="scss" scoped>
.panel-navigation {
	position: relative;
	display: flex;
	align-items: center;
	z-index: 1;

	.context-switcher {
		display: flex;

		li {
			position: relative;
			z-index: 0;
			list-style: none;

			&:not(:last-child) {
				margin-right: 24px;
			}

			&:not(.account) {
				position: relative;
				width: 48px;
				height: 48px;
				display: inline-flex;
				align-items: center;
				justify-content: center;

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

				&::before {
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
		}

		.account {
			display: flex;

			&:hover .account-avatar {
				border-color: var(--kt-primary-color);
			}

			.account-avatar {
				width: 48px;
				height: 48px;
				border-radius: 50%;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
	}
}
</style>
