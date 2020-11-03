<template>
	<main class="v--layout-panel">
		<the-navbar />
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
		<slot />
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

@Component({
	components: { TheNavbar, VLabel, VContainer, TheNavbarItems },
})
export default class PanelLayout extends mixins(PanelMixin, AuthMixin) {}
</script>
<style lang="scss">
.v--layout-panel {
	display: flex;
	flex-direction: column !important;
	background-color: var(--app-background);
	color: var(--app-text-color);

	.v--navbar {
		background-color: #0fb9b1;
		color: #ffffff;
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
