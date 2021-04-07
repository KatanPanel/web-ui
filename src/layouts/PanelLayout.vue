<template>
	<main class="panel-layout">
		<div id="panel-sidebar" class="panel-sidebar">
			<div class="sidebar-inner">
				<div class="sidebar-logo">
					<router-link :to="{ name: 'home' }" tag="a">
						<the-logo color="blue"/>
					</router-link>
				</div>
				<ul class="sidebar-items">
					<router-link
						:to="{ name: 'home' }"
						class="ignore-route"
						tag="li"
					>
						<a>
							<v-icon name="home"/>
							<span>{{
									$t("navigation.sidebar.links.home")
								}}</span>
						</a>
					</router-link>
					<router-link :to="{ name: 'games' }" tag="li">
						<a>
							<v-icon name="gamepad"/>
							<span>{{
									$t("navigation.sidebar.links.game-library")
								}}</span>
						</a>
					</router-link>
				</ul>
				<div v-for="window in getWindows" :key="window.id">
					<span class="sidebar-label">
						Servidor — {{ window.name }}
					</span>
					<ul class="sidebar-items">
						<window-link
							:check="window.id"
							:to="{ name: 'server.overview' }"
							tag="li"
						>
							<a>
								<v-icon name="control-panel"/>
								<span>{{
										$t(
											"navigation.sidebar.links.server.overview"
										)
									}}</span>
							</a>
						</window-link>
						<window-link
							:to="{ name: 'server.console' }"
							:check="window.id"
							tag="li"
						>
							<a>
								<v-icon name="keyboard"/>
								<span>{{
										$t(
											"navigation.sidebar.links.server.console"
										)
									}}</span>
							</a>
						</window-link>
						<window-link
							:to="{ name: 'server.fs' }"
							:check="window.id"
							tag="li"
						>
							<a>
								<v-icon name="ftp-cloud"/>
								<span>{{
										$t("navigation.sidebar.links.server.fs")
									}}</span>
							</a>
						</window-link>
						<window-link
							:to="{ name: 'server.settings' }"
							:check="window.id"
							tag="li"
						>
							<a>
								<v-icon name="cog"/>
								<span>{{
										$t(
											"navigation.sidebar.links.server.settings"
										)
									}}</span>
							</a>
						</window-link>
					</ul>
				</div>
				<div class="sidebar-label">
					{{ $t("navigation.sidebar.labels.system") }}
				</div>
				<ul class="sidebar-items">
					<router-link :to="{ name: 'system.accounts' }" tag="li">
						<a>
							<v-icon name="users"/>
							<span>{{
									$t("navigation.sidebar.links.system.accounts")
								}}</span>
						</a>
					</router-link>
				</ul>
				<div class="sidebar-label">
					{{ $t("navigation.sidebar.labels.advanced") }}
				</div>
				<ul class="sidebar-items">
					<router-link :to="{ name: 'advanced.settings' }" tag="li">
						<a>
							<v-icon name="user-preferences"/>
							<span>{{
									$t(
										"navigation.sidebar.links.advanced.settings.index"
									)
								}}</span>
						</a>
						<ul class="sidebar-sub-items">
							<router-link
								:to="{ name: 'advanced.settings.language' }"
								tag="li"
							>
								<a>{{
										$t(
											"navigation.sidebar.links.advanced.settings.language"
										)
									}}</a>
							</router-link>
							<router-link
								:to="{ name: 'advanced.settings.appearence' }"
								tag="li"
							>
								<a>{{
										$t(
											"navigation.sidebar.links.advanced.settings.appearence"
										)
									}}</a>
							</router-link>
							<router-link
								:to="{ name: 'advanced.settings.performance' }"
								tag="li"
							>
								<a>{{
										$t(
											"navigation.sidebar.links.advanced.settings.performance"
										)
									}}</a>
							</router-link>
						</ul>
					</router-link>
				</ul>
				<ul class="sidebar-items v--m-top-5">
					<li class="logout" @click="performLogout">
						<a href="javascript:void(0)">
							<v-icon name="logout"/>
							<span>{{
									$t("navigation.sidebar.links.logout")
								}}</span>
						</a>
					</li>
					<li v-if="$isDevelopmentMode" class="v--text-muted-darker">
						<a href="javascript:void(0)">
							<small>{{
									$t("navigation.sidebar.links.development-mode")
								}}</small>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="panel-content">
			<slot/>
		</div>
	</main>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import TheLogo from "@/components/TheLogo.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import {getOpenWindows} from "@/common/navigation/window";
import WindowLink from "@/components/navigation/WindowLink.vue";
import VTab from "@/components/ui/tab/VTab.vue";
import {dispatch} from "@/utils/vuex";
import {AUTH_MODULE} from "@/store";
import {AUTH_LOGOUT} from "@/store/modules/auth/actions";

@Component({
	components: {
		VTab,
		WindowLink,
		VIcon,
		TheLogo,
		VLabel,
		VContainer,
	},
})
export default class PanelLayout extends Vue {
	get getWindows(): any[] {
		return getOpenWindows();
	}

	performLogout(): void {
		dispatch(AUTH_MODULE, AUTH_LOGOUT).then(() => {
			this.$router.replace({name: "login"});
		});
	}
}
</script>
<style lang="scss">
$sidebar-width: 240px;
$border-radius: 64px;

.panel-layout {
	display: flex;
	flex-direction: row !important; // override #app
	background-color: var(--kt-background);
	color: var(--kt-text-color);
	position: relative;

	.panel-content {
		position: relative;
		flex: 1;
		padding: 48px;
		max-width: 100%;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.panel-sidebar {
		position: relative;
		margin-right: 24px;
		height: 100vh;
		opacity: 1;
		min-width: $sidebar-width;
		max-width: $sidebar-width;

		// above window selection
		z-index: 2;

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
			position: fixed;
			min-width: $sidebar-width;
			max-width: $sidebar-width;
			height: 100%;
			display: flex;
			flex-direction: column;
			overflow-x: hidden;
			overflow-y: auto;
			box-shadow: var(--kt-shadow) 0 0 3px 0;
			background-color: var(--kt-panel-sidebar);

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
				padding: 4px 0;
				margin: -4px 0;

				&.router-link-active:not(.ignore-route) {
					a {
						opacity: 1;
						border-left-color: var(--kt-primary-color);
					}

					.sidebar-sub-items a {
						color: inherit;
						border-left: none;
					}
				}

				&:not(.router-link-active) .sidebar-sub-items {
					display: none;
				}

				&:not(.router-link-exact-active) a:hover {
					color: currentColor;
					opacity: 1;
					border-left-color: currentColor;

					svg {
						fill: currentColor;
					}
				}

				&.logout {
					color: var(--kt-danger-color);

					svg {
						fill: var(--kt-danger-color);
					}
				}

				a {
					text-decoration: none;
					display: flex;
					padding: 8px 12px 8px 36px;
					border-left: 2px solid transparent;
					opacity: 0.7;

					span {
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
					margin-right: 24px;
				}
			}

			.sidebar-sub-items {
				font-size: 14px;
				margin-left: calc((12px * 7) + 3px);

				li {
					padding: 0;
					margin: 0;
					opacity: 0.7;

					&.router-link-active {
						opacity: 1;
					}

					&:hover {
						opacity: 1;
					}

					a {
						opacity: 0.7;
						padding: 2px 0;

						&:hover {
							opacity: 1;
						}
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
					border-bottom: 2px solid var(--kt-background-tertiary);
				}

				a {
					text-decoration: none;
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 24px;

					&:hover {
						background-color: var(--kt-background-tertiary);
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
