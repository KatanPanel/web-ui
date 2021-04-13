<template>
	<main class="panel-layout">
		<!-- <div id="panel-sidebar" class="panel-sidebar">
			<div class="sidebar-inner">
				<div class="sidebar-logo">
					<router-link :to="{ name: 'home' }" tag="a">
						<the-logo color="blue" />
					</router-link>
				</div>
				<ul class="sidebar-items">
					<router-link
						:to="{ name: 'home' }"
						class="ignore-route"
						tag="li"
					>
						<a>
							<v-icon name="home" />
							<span>{{
								$t("navigation.sidebar.links.home")
							}}</span>
						</a>
					</router-link>
					<router-link :to="{ name: 'games' }" tag="li">
						<a>
							<v-icon name="gamepad" />
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
								<v-icon name="control-panel" />
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
								<v-icon name="keyboard" />
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
								<v-icon name="ftp-cloud" />
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
								<v-icon name="cog" />
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
							<v-icon name="users" />
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
							<v-icon name="user-preferences" />
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
							<v-icon name="logout" />
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
		</div> -->
		<ThePanelSidebar />
		<div class="panel-content">
			<slot />
		</div>
	</main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ThePanelSidebar from "@/components/panel/ThePanelSidebar.vue";

@Component({
	components: {
		ThePanelSidebar,
	},
})
export default class PanelLayout extends Vue {}
</script>
<style lang="scss">
.panel-layout {
	display: flex;
	flex-direction: row !important; // override #app
	background-color: var(--kt-background);
	color: var(--kt-text-color);
	position: relative;

	.panel-content {
		position: relative;
		flex: 1;
		padding: 36px 48px;
		max-width: 100%;
		min-height: 100vh;
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
