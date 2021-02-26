<template>
	<main class="v--layout-panel">
		<div class="v--layout-panel-sidebar" id="v--layout-panel-sidebar">
			<div class="sidebar-inner">
				<div class="sidebar-logo">
					<router-link :to="{ name: HOME_ROUTE }" tag="a">
						<the-logo color="blue" />
					</router-link>
				</div>
				<ul class="sidebar-items">
					<router-link :to="{ path: '/' }" tag="li">
						<a>
							<v-icon name="home" />
							<span>Página Inicial</span>
						</a>
					</router-link>
				</ul>
				<div
					v-for="window in getWindows"
					:key="window.id"
					:disabled="window.state === 'minimized'"
					class="sidebar-window"
				>
					<span class="sidebar-label">{{ window.data.name }}</span>
					<ul class="sidebar-items">
						<window-link
							:to="{ name: SERVER_OVERVIEW_ROUTE }"
							:check="window.id"
							tag="li"
						>
							<v-icon name="hashtag" />
							<span>Visão geral</span>
						</window-link>
						<window-link
							:to="{ name: SERVER_CONSOLE_ROUTE }"
							:check="window.id"
							tag="li"
						>
							<v-icon name="terminal" />
							<span>Console</span>
						</window-link>
						<window-link
							:to="{ name: SERVER_FS_ROUTE }"
							:check="window.id"
							tag="li"
						>
							<v-icon name="ftp-folder" />
							<span>Explorador de Arquivos</span>
						</window-link>
					</ul>
				</div>
				<span class="sidebar-label">Sistema</span>
				<ul class="sidebar-items">
					<router-link :to="{ name: SYSTEM_GAMES_ROUTE }" tag="li">
						<a>
							<v-icon name="games" />
							<span>Jogos</span>
						</a>
					</router-link>
				</ul>
				<span class="sidebar-label">Avançado</span>
				<ul class="sidebar-items">
					<router-link
						:to="{ name: ADVANCED_SETTINGS_ROUTE }"
						tag="li"
					>
						<a>
							<v-icon name="double-cog" />
							<span>Configurações</span>
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
import { Component } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import TheLogo from "@/components/TheLogo.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import { mixins } from "vue-class-component";
import { AppMixin } from "@/common/internal/mixins/app";
import { getOpenWindows } from "@/common/navigation/window";
import WindowLink from "@/components/navigation/WindowLink.vue";

@Component({
	components: {
		WindowLink,
		VIcon,
		TheLogo,
		VLabel,
		VContainer,
	},
})
export default class PanelLayout extends mixins(AppMixin) {
	private get getWindows(): any[] {
		return getOpenWindows();
	}
}
</script>
<style lang="scss">
$sidebar-width: 240px;
$border-radius: 64px;

.v--layout-panel {
	display: flex;
	flex-direction: row !important; // override #app
	background-color: var(--kt-background);
	color: var(--kt-text-color);
	position: relative;

	.v--layout-panel-content {
		position: relative;
		flex: 1 0 auto;
		padding: 48px;
		max-width: 100%;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.v--layout-panel-sidebar {
		position: relative;
		margin-right: 24px;
		height: 100vh;
		opacity: 1;
		min-width: $sidebar-width;
		max-width: $sidebar-width;
		// border-top-right-radius: $border-radius;
		// border-bottom-right-radius: $border-radius;

		.sidebar-logo {
			margin-bottom: 36px;
			margin-left: 36px;
			border-left: 2px solid transparent;

			.v--katan-logo {
				width: 54px;
				height: 54px;
			}
		}

		&[disabled] {
			opacity: 0;
			display: none;
		}

		.sidebar-inner {
			padding: 48px 0;
			// background-color: var(--layout-panel-sidebar-color);
			position: fixed;
			min-width: $sidebar-width;
			max-width: $sidebar-width;
			height: 100%;
			display: flex;
			flex-direction: column;
			// box-shadow: rgba(0, 0, 0, 0.12) 1px 0 8px 2px;
			// border-right: 1px solid var(--app-border-color);
			// align-items: center;
		}

		.sidebar-window[disabled] {
			opacity: 0.38;
		}

		.sidebar-label {
			display: block;
			font-size: 12px;
			font-weight: 800;
			text-transform: uppercase;
			user-select: none;
			margin-top: 36px;
			margin-left: 36px;
			margin-bottom: 4px;
			opacity: 0.54;
		}

		.sidebar-items {
			display: flex;
			flex-direction: column;
			justify-content: center;

			&:last-child {
				justify-content: flex-end;
			}

			li {
				list-style-type: none;
				font-weight: 600;
				// color: var(--inverse-color);
				border-left: 2px solid transparent;
				width: $sidebar-width;
				border-top-right-radius: 24px;
				border-bottom-right-radius: 24px;

				&:not(.router-link-exact-active):hover {
					opacity: 0.7;
				}

				&.router-link-exact-active {
					background-color: rgba(75, 123, 236, 0.12);
					a {
						span {
							color: var(--kt-primary-color);
						}

						svg {
							fill: var(--kt-primary-color);
						}
					}
				}

				a {
					text-decoration: none;
					display: flex;
					padding: 12px 36px;

					span {
						margin-left: 24px;
						vertical-align: middle;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						display: block;
					}
				}

				svg {
					flex: 1 0 auto;
					vertical-align: middle;
					user-select: none;
					// fill: var(--inverse-color);
					max-width: 24px;
					max-height: 24px;
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
							color: var(--kt-muted-color);
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
