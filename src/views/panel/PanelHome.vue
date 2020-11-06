<template>
	<div class="panel-home">
		<h1>
			<b>Welcome, {{ getAccount.username }}!</b>
		</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import { mixins } from "vue-class-component";
import { AuthMixin } from "@/mixins/auth";
import { PanelMixin } from "@/mixins/panel";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import { MetaInfo } from "vue-meta";

@Component({
	components: { VBoxHeader, VBoxBody, VBox, VContainer },
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("titles.panel.home") as string,
		};
	},
})
export default class PanelHome extends mixins(AuthMixin, PanelMixin) {}
</script>
