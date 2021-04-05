<template>
	<div class="server">
		<!-- <div class="server-header">
			<p class="v--text-fw-700 v--text-uppercase">
				<span :class="`server-state ${getServer.state.toLowerCase()}`">
					{{ $t(`server-state.${getServer.state.toLowerCase()}`) }}
				</span>
			</p>
		</div> -->
		<keep-alive>
			<component
				:window="window"
				:is="getWindowComponent"
				:key="getWindow.location.name"
			/>
		</keep-alive>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NavigationGuardNext, Route } from "vue-router";
import { mixins } from "vue-class-component";
import WindowMixin from "@/common/internal/mixins/window";
import ServerConsole from "@/views/server/ServerConsole.vue";
import ServerInfo from "@/views/server/ServerInfo.vue";
import ServerFS from "@/views/server/ServerFS.vue";
import VTabs from "@/components/ui/tab/VTabs.vue";
import WindowLink from "@/components/navigation/WindowLink.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import { AppMixin } from "@/common/internal/mixins/app";
import { MetaInfo } from "vue-meta";
import ServerFSDisk from "@/views/server/fs/ServerFSDisk.vue";
import { resolveWindow } from "@/common/navigation/window";

@Component<Server>({
	components: { VIcon, VTabLink: WindowLink, VTabs },
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("titles.server.index", {
				server: this.getWindow.data.name,
			}) as string,
		};
	},
	beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
		// We have to update the current window to the next server he is going to join.
		resolveWindow(to.params.serverId, to).then(() => next());
	},
	mounted(): void {
		this.$connect();
	},
})
export default class Server extends mixins(WindowMixin) {
	@Prop({ type: Number, required: true }) private readonly serverId!: number;

	/**
	 * Returns the corresponding Vue component for the specified tab.
	 */
	private get getWindowComponent(): typeof Vue {
		switch (this.getWindow.location.name) {
			case this.CONSOLE_TAB:
				return ServerConsole;
			case this.FS_TAB:
				return ServerFS;
			case this.FS_DISK_TAB:
				return ServerFSDisk;
			default:
				return ServerInfo;
		}
	}
}
</script>
<style lang="scss" scoped>
.server {
	position: relative;

	.server-header {
		position: relative;
		display: flex;
		flex-direction: row;
		margin-bottom: 16px;
	}

	.server-state {
		/** &::before {
			content: "";
			width: 16px;
			height: 16px;
			border-radius: 50%;
			border: 4px solid var(--primary-color);
			position: relative;
			display: inline-block;
			margin-right: 8px;
		} */

		&.running {
			color: var(--kt-success-color);
		}

		&.restarting,
		&.paused {
			color: var(--kt-warning-color);
		}

		&.unknown,
		&.dead {
			color: var(--kt-danger-color);
		}

		&.unloaded {
			color: var(--kt-muted-color);
		}

		svg {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
	}
}
</style>
