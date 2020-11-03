<template>
	<v-container>
		<!-- TODO -->
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import VContainer from "@/components/ui/layout/VContainer.vue";

@Component<Account>({
	components: { VContainer },
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("pages-title.account")! as string,
		};
	},
})
export default class Account extends Vue {}
</script>
