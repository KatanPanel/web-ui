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
	<div id="panel-sidebar" class="panel-sidebar">
		<div class="sidebar-inner">
			<ul class="sidebar-items">
				<router-link
					:to="{ name: 'home' }"
					class="sidebar-logo"
					tag="li"
				>
					<a>
						<TheLogo :white="true" />
					</a>
				</router-link>
			</ul>
			<ul class="sidebar-items">
				<router-link
					:to="{ name: 'home' }"
					class="ignore-route"
					tag="li"
				>
					<a
						v-tooltip="
							sidebarTooltip($t('navigation.sidebar.links.home'))
						"
					>
						<v-icon name="home" />
					</a>
				</router-link>
				<router-link :to="{ name: 'games' }" tag="li">
					<a
						v-tooltip="
							sidebarTooltip(
								$t('navigation.sidebar.links.game-library')
							)
						"
					>
						<v-icon name="gamepad" />
					</a>
				</router-link>
				<router-link :to="{ name: 'system.accounts' }" tag="li">
					<a
						v-tooltip="
							sidebarTooltip(
								$t('navigation.sidebar.links.system.accounts')
							)
						"
					>
						<v-icon name="id-card" />
					</a>
				</router-link>
			</ul>
			<ul class="sidebar-items">
				<li
					v-tooltip="
						sidebarTooltip($t('navigation.sidebar.links.logout'))
					"
					@click="$emit('logout')"
				>
					<a>
						<v-icon name="logout" />
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VIcon from "@/components/ui/icon/VIcon.vue";
import TheLogo from "@/components/TheLogo.vue";

@Component({
	components: { VIcon, TheLogo }
})
export default class ThePanelSidebar extends Vue {
	sidebarTooltip(content: any): any {
		/* return {
			content,
			classes: ["v--tooltip", "sidebar-tooltip"],
		}; */
		return {};
	}
}
</script>
<style lang="scss">
$sidebar-width: 100px;
$border-radius: 64px;

.sidebar-tooltip {
	.tooltip-arrow {
		border-color: var(--kt-primary-text-color) !important;
	}

	.tooltip-inner {
		background: var(--kt-primary-text-color) !important;
		color: var(--kt-primary-color) !important;
	}
}

.panel-sidebar {
	position: relative;
	margin-right: 24px;
	opacity: 1;
	width: $sidebar-width;
	z-index: 2;

	.sidebar-inner {
		padding: 12px 0;
		position: fixed;
		min-width: $sidebar-width;
		max-width: $sidebar-width;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
		overflow-y: auto;
		box-shadow: rgba(0, 0, 0, 0.12) 0 0 6px 0;
		background-color: var(--kt-sidebar-background);

		&::-webkit-scrollbar {
			width: 6px;
			background-color: var(--kt-scrollbar);
		}

		&::-webkit-scrollbar-track {
			border-radius: 8px;
			background-color: var(--kt-scrollbar);
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
			background-color: var(--kt-scrollbar-thumb);
		}

		.sidebar-items {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			margin: 24px 0;

			&:last-child {
				position: absolute;
				bottom: 0;
				right: 0;
				left: 0;
			}

			li {
				list-style-type: none;
				margin: 24px 0;

				a {
					padding: 12px;
					border-radius: 8px;

					svg {
						width: 24px;
						height: 24px;
						fill: var(--kt-primary-text-color);
					}
				}

				&:not(.sidebar-logo) {
					&:hover a {
						background-color: var(--kt-sidebar-link-hover);
					}

					&.router-link-exact-active a {
						background-color: var(
							--kt-sidebar-link-active-background
						);

						svg {
							fill: var(--kt-sidebar-link-active-color);
						}
					}
				}
			}

			.sidebar-logo {
				margin: 0 0 48px 0;

				img {
					max-width: 48px;
				}
			}
		}
	}
}
</style>
