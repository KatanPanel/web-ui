<template>
	<div :class="$style.component">
		<div v-if="$scopedSlots.header" :class="$style.header">
			<slot name="header" />
		</div>
		<div :class="$style.body">
			<slot />
		</div>
		<div v-if="$scopedSlots.footer" :class="$style.footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VBox extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly outlined!: boolean;
}
</script>
<style lang="scss" module>
$base-padding: 24px;

.component {
	position: relative;
	background-color: var(--kt-background-secondary);
	border: 1px solid var(--kt-border-color);
	box-shadow: rgba(0, 0, 0, 0.12) 0 0 10px 5px;
	border-radius: 8px;
}

.header {
	padding: $base-padding $base-padding 0 $base-padding;
}

.body {
	padding: $base-padding;
}

.footer {
	padding: 0 $base-padding $base-padding $base-padding;
	justify-content: flex-end;
	display: flex;
}
</style>
