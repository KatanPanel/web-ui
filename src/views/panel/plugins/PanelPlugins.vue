<template>
	<div class="panel-plugins">
		<h1>
			<b>{{ $t("header.panel.plugins") }}</b>
		</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import VContainer from "@/components/ui/layout/VContainer.vue";

@Component({
	components: { VContainer },
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("titles.panel.plugins") as string,
		};
	},
})
export default class PanelPlugins extends Vue {}
</script>
