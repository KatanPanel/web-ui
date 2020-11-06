<template>
	<v-container>
		<h1>Overview {{ serverId }}</h1>
		<transition name="v--transition-fade" mode="out-in">
			<div :key="getServer.id">
				{{ JSON.stringify(getServer) }}
			</div>
		</transition>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import VContainer from "@/components/ui/layout/VContainer.vue";
import { mixins } from "vue-class-component";
import { PanelMixin } from "@/mixins/panel";
import { Route } from "vue-router";
import { PANEL_MODULE } from "@/store";
import { PANEL_SET_SERVER } from "@/store/panel/actions";

@Component({
	components: { VContainer },
	metaInfo(): MetaInfo {
		return {
			title: (this as PanelMixin).getServer?.name || "...",
		};
	},
})
export default class PanelServer extends mixins(PanelMixin) {
	@Prop({ type: String, required: true }) private readonly serverId!: string;

	@Watch("$route")
	onRouteChange(to: Route): void {
		this.$store.dispatch(PANEL_MODULE.concat("/", PANEL_SET_SERVER), {
			serverId: to.params.serverId,
		});
	}
}
</script>
