<template>
	<div class="server">
		<ServerLastInfo v-show="$route.name !== 'server.overview'"/>
		<keep-alive :max="5">
			<component
				:window="window"
				:is="getWindowComponent"
				:key="getWindow.location.name"
			/>
		</keep-alive>
	</div>
</template>

<script lang="ts">
import {Component, Prop} from "vue-property-decorator";
import {NavigationGuardNext, Route} from "vue-router";
import {mixins} from "vue-class-component";
import WindowMixin from "@/mixins/window";
import {resolveWindow} from "@/common/navigation/window";
import {MetaInfo} from "vue-meta";
import ServerLastInfo from "@/components/server/ServerLastInfo.vue";
import ServerConsoleContent from "@/components/server/ServerConsoleContent.vue";

@Component<Server>({
	components: {
		ServerConsoleContent,
		ServerLastInfo,
	},
	metaInfo(): MetaInfo {
		return {title: this.getServer.name};
	},
	beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext): void {
		// We have to update the current window to the next server he is going to join.
		resolveWindow(to.params.serverId, to).then(() => next());
	},
	mounted(): void {
		this.$connect();
	},
})
export default class Server extends mixins(WindowMixin) {
	@Prop({type: Boolean, default: false})
	protected readonly useWindowHooks!: boolean;
	@Prop({type: Number, required: true}) private readonly serverId!: number;

	/**
	 * Returns the corresponding Vue component for the current Window location.
	 */
	private get getWindowComponent(): any {
		return this.$helpers.routeMappings[
			this.getWindow.location.name as string
			]();
	}
}
</script>
<style lang="scss">
.server {
	.server-icon {
		width: 48px;
		height: 48px;
		box-shadow: inset rgba(0, 0, 0, 0.12) 0 0 8px 0;
		border-radius: 50%;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		margin-right: 12px;
		padding: 8px;
	}
}
</style>
