<template>
	<div :class="$style.root">
		<h4 :class="$style.title"><slot name="title" /></h4>
		<VBody1 v-if="$slots.subtitle" :class="$style.subtitle"
			><slot name="subtitle"
		/></VBody1>
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VBody1 from "@/features/shared/ui/components/design-system/typography/VBody1.vue";

@Component({
	components: { VBody1 }
})
export default class PageHeader extends Vue {}
</script>

<style lang="scss" module>
.root {
	margin-bottom: 3.2rem;
}

.title {
	font-weight: 600;
}

.subtitle {
	margin-top: 1.6rem;
	color: var(--kt-content-neutral);
}
</style>
