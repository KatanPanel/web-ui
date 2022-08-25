<template>
	<div :class="$style.root">
		<h4 :class="$style.title"><slot name="title" /></h4>
		<VBody2 v-if="$slots.subtitle" :class="$style.subtitle">
			<slot name="subtitle" />
		</VBody2>
		<div v-if="$slots.default" :class="$style.body">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";

@Component({
	components: { VBody2 }
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

.body {
	margin-top: 1.2rem;
}
</style>
