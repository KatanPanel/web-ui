<template>
	<main class="v--layout-panel">
		<div class="sidebar">
			<div class="sidebar-inner">
				<div class="sidebar-logo">
					<the-logo />
				</div>
				<ul class="sidebar-items">
					<router-link :to="{ name: PANEL_HOME_ROUTE }" tag="li">
						<a>
							<v-icon name="home" />
						</a>
					</router-link>
					<router-link :to="{ name: PANEL_HOME_ROUTE }" tag="li">
						<a>
							<v-icon name="fingerprint" />
						</a>
					</router-link>
					<router-link :to="{ name: PANEL_PLUGINS_ROUTE }" tag="li">
						<a>
							<v-icon name="3d-modeling" />
						</a>
					</router-link>
					<router-link :to="{ name: PANEL_HOME_ROUTE }" tag="li">
						<a>
							<v-icon name="server-storage" />
						</a>
					</router-link>
					<router-link :to="{ name: PANEL_HOME_ROUTE }" tag="li">
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
		<!-- <div class="server-selector">
			<v-label>Server list ({{ getServerList.length }})</v-label>
			<ul>
				<router-link tag="li" :to="{ name: 'server', params: { serverId: server.id.toString() } }" v-for="server in getServerList" :key="server.id" exact>
					<a href="#" :title="server.name">
						<div class="server-icon" :class="{ selected: getServer && getServer.id === server.id }">
							<img :src="`/img/games/icons/${server.game.type.name.toLowerCase()}.png`" :alt="`${server.game.type.name} icon`">
						</div>
						<div class="server-info">
							<div class="server-name" v-text="server.name"/>
							<span class="server-ip">{{ server.host }}:{{ server.port }}</span>
						</div>
					</a>
				</router-link>
			</ul>
		</div> -->
		<div class="v--layout-panel-content">
			<slot />
		</div>
	</main>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import TheNavbar from "@/components/TheNavbar.vue";
import { mixins } from "vue-class-component";
import { PanelMixin } from "@/mixins/panel";
import TheNavbarItems from "@/components/TheNavbarItems.vue";
import VContainer from "@/components/ui/layout/VContainer.vue";
import { AuthMixin } from "@/mixins/auth";
import VLabel from "@/components/ui/form/VLabel.vue";
import TheLogo from "@/components/TheLogo.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import {
	PANEL_ACCOUNT_ROUTE,
	PANEL_PLUGINS_ROUTE,
	PANEL_ROUTE,
} from "@/router";

@Component({
	components: {
		VIcon,
		TheLogo,
		TheNavbar,
		VLabel,
		VContainer,
		TheNavbarItems,
	},
})
export default class PanelLayout extends mixins(PanelMixin, AuthMixin) {
	private readonly PANEL_HOME_ROUTE = PANEL_ROUTE;
	private readonly PANEL_PLUGINS_ROUTE = PANEL_PLUGINS_ROUTE;
	private readonly PANEL_ACCOUNT_ROUTE = PANEL_ACCOUNT_ROUTE;
}
</script>
<style lang="scss">
.v--layout-panel {
	display: flex;
	flex-direction: row !important;
	background-color: var(--layout-panel-background-color);
	color: var(--app-text-color);

	.v--layout-panel-content {
		padding: 48px;
		flex: 1 0 auto;
	}

	.sidebar {
		position: relative;
		height: 100vh;
		width: 140px;

		.v--katan-logo {
			width: 50px;
			height: 50px;
		}

		.sidebar-inner {
			max-width: 140px;
			padding: 64px 48px;
			background-color: var(--app-foreground);
			position: fixed;
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
					fill: var(--muted-color);
				}

				&:not(:last-child) {
					margin-bottom: 48px;
				}

				&:hover:not(.router-link-exact-active) {
					background-color: var(--app-foreground-overlay);
				}

				&.router-link-exact-active.router-link-active {
					background-color: var(--primary-color);
					box-shadow: rgba(0, 0, 0, 0.12) 0 0 4px 4px;

					svg {
						fill: #fff;
					}
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
