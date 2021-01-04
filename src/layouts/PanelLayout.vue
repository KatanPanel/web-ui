<template>
	<main class="v--layout-panel">
		<div class="v--layout-panel-sidebar" id="v--layout-panel-sidebar">
			<div class="sidebar-inner">
				<div class="sidebar-logo">
					<the-logo color="white" />
				</div>
				<ul class="sidebar-items">
					<router-link :to="{ name: PANEL_HOME_ROUTE }" tag="li">
						<a>
							<v-icon name="home" />
						</a>
					</router-link>
					<!-- <router-link :to="{ name: PANEL_HOME_ROUTE }" tag="li">
						<a>
							<v-icon name="fingerprint" />
						</a>
					</router-link> -->
					<router-link :to="{ name: PANEL_PLUGINS_ROUTE }" tag="li">
						<a>
							<v-icon name="3d-modeling" />
						</a>
					</router-link>
					<router-link :to="{ name: PANEL_NODES_ROUTE }" tag="li">
						<a>
							<v-icon name="cloud-storage" />
						</a>
					</router-link>
					<router-link :to="{ name: PANEL_SETTINGS_ROUTE }" tag="li">
						<a>
							<v-icon name="cogwheel" />
						</a>
					</router-link>
				</ul>
				<ul class="sidebar-items">
					<router-link :to="{ name: PANEL_ACCOUNT_ROUTE }" tag="li">
						<a>
							<v-icon name="user" />
						</a>
					</router-link>
				</ul>
			</div>
		</div>
		<div class="v--layout-panel-content">
			<slot />
		</div>
	</main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import TheLogo from "@/components/TheLogo.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import {
	PANEL_ACCOUNT_ROUTE,
	PANEL_PLUGINS_ROUTE,
	PANEL_ROUTE,
	PANEL_NODES_ROUTE,
	PANEL_SETTINGS_ROUTE,
} from "@/router";

@Component({
	components: {
		VIcon,
		TheLogo,
		VLabel,
		VContainer,
	},
})
export default class PanelLayout extends Vue {
	private readonly PANEL_HOME_ROUTE = PANEL_ROUTE;
	private readonly PANEL_PLUGINS_ROUTE = PANEL_PLUGINS_ROUTE;
	private readonly PANEL_ACCOUNT_ROUTE = PANEL_ACCOUNT_ROUTE;
	private readonly PANEL_NODES_ROUTE = PANEL_NODES_ROUTE;
	private readonly PANEL_SETTINGS_ROUTE = PANEL_SETTINGS_ROUTE;
}
</script>
<style lang="scss">
$sidebar-width: 140px;

.v--layout-panel {
	display: flex;
	flex-direction: row !important; // override #app
	background-color: var(--app-background);
	color: var(--app-text-color);
	position: relative;

	.v--layout-panel-content {
		position: relative;
		flex: 1 0 auto;
		padding: 48px;
	}

	.v--layout-panel-sidebar {
		position: relative;
		height: 100vh;
		opacity: 1;
		min-width: $sidebar-width;
		box-shadow: rgba(0, 0, 0, 0.12) 4px 0 8px 0;

		.v--katan-logo {
			width: 64px;
			height: 64px;
		}

		&[disabled] {
			opacity: 0;
			display: none;
		}

		.sidebar-inner {
			max-width: $sidebar-width;
			padding: 48px 0;
			background-color: var(--layout-panel-sidebar-color);
			position: fixed;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.sidebar-items {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1 0 auto;

			&:last-child {
				justify-content: flex-end;
			}

			li {
				display: flex;
				align-items: center;
				justify-content: center;
				list-style-type: none;
				border-radius: 16px;
				box-shadow: rgba(0, 0, 0, 0.12) 0 0 4px 0;

				a {
					padding: 12px;
				}

				svg {
					vertical-align: middle;
					fill: #fff;
					user-select: none;
				}

				&:not(:last-child) {
					margin-bottom: 48px;
				}

				&:hover:not(.router-link-exact-active) {
					background-color: rgba(255, 255, 255, 0.12);
				}

				&.router-link-exact-active.router-link-active {
					background-color: var(--app-foreground-overlay);
					svg {
						fill: var(--primary-color);
					}
					box-shadow: rgba(0, 0, 0, 0.12) 0 0 4px 4px;
				}
			}
		}
	}

	.server-selector {
		position: fixed;
		color: black;
		z-index: 1001;
		height: 100%;
		box-shadow: rgba(0, 0, 0, 0.12) 0 0 8px 2px;

		ul {
			list-style-type: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			li {
				&:not(:last-child) {
					border-bottom: 2px solid var(--app-foreground-overlay);
				}

				a {
					text-decoration: none;
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 24px;

					&:hover {
						background-color: var(--app-foreground-overlay);
					}

					.server-info {
						line-height: 1;
						margin-left: 12px;

						.server-ip {
							font-size: 12px;
							color: var(--muted-color);
						}
					}
				}

				.server-icon {
					&:not(.selected):hover img {
						filter: none;
					}

					&:not(.selected) img {
						// filter: grayscale(1);
					}
				}

				.server-icon,
				.server-icon img {
					width: 40px;
					height: 40px;
				}
			}
		}
	}
}
</style>
