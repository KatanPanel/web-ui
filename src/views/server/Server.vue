<template>
	<div class="server">
		<div class="server-header">
			<h1 class="v--text-primary v--text-fw-800">
				{{ getWindow.data.id }}. {{ getWindow.data.name }}
			</h1>
			<v-tabs
				:style="{ 'border-bottom-color': 'transparent !important' }"
			>
				<v-tab-link :to="{ name: DEFAULT_TAB }" :window="window"
					>Painel de Controle
				</v-tab-link>
				<v-tab-link :to="{ name: CONSOLE_TAB }" :window="window">
					<v-icon name="terminal" />
					Console
				</v-tab-link>
				<v-tab-link :to="{ name: FS_TAB }" :window="window">
					<v-icon name="folder" />
					Gerenciador de Arquivos
				</v-tab-link>
				<!-- <v-tab-link>Tarefas Cronômetradas</v-tab-link>
				<v-tab-link>Avançado</v-tab-link> -->
			</v-tabs>
			<hr />
		</div>
		<keep-alive>
			<component
				:window="window"
				:is="getWindowComponent"
				:key="getWindow.route"
			/>
		</keep-alive>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NavigationGuardNext, Route } from "vue-router";
import { PANEL_SERVER_CONSOLE_ROUTE, PANEL_SERVER_FS_ROUTE } from "@/router";
import { mixins } from "vue-class-component";
import WindowMixin from "@/mixins/window";
import { resolveWindow } from "@/store";
import ServerConsole from "@/views/server/ServerConsole.vue";
import ServerInfo from "@/views/server/ServerInfo.vue";
import ServerFS from "@/views/server/ServerFS.vue";
import VTabs from "@/components/ui/tab/VTabs.vue";
import VTabLink from "@/components/ui/tab/VTabLink.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import { AppMixin } from "@/mixins/app";

@Component<Server>({
	components: { VIcon, VTabLink, VTabs },
	beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
		// We have to update the current window to the next server he is going to join.
		resolveWindow(to.params.serverId, to.name as string).then(() => next());
	},
	mounted(): void {
		this.$connect();
	},
})
export default class Server extends mixins(AppMixin, WindowMixin) {
	@Prop({ type: String, required: true }) private readonly serverId!: string;

	/**
	 * Returns the corresponding Vue component for the specified tab.
	 * @param {string} route
	 */
	private get getWindowComponent(): typeof Vue {
		switch (this.getWindow.route) {
			case PANEL_SERVER_CONSOLE_ROUTE:
				return ServerConsole;
			case PANEL_SERVER_FS_ROUTE:
				return ServerFS;
			default:
				return ServerInfo;
		}
	}
}
</script>
<style lang="scss" scoped>
.server {
	position: relative;
}
</style>
