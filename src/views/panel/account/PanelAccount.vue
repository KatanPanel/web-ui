<template>
	<div class="panel-account">
		<h1>
			<b>{{ $t("header.panel.account") }}</b>
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
			title: (this as Vue).$i18n.t("titles.panel.account") as string,
		};
	},
})
export default class PanelAccount extends Vue {}
</script>
