<template>
	<div class="v--select-option">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VSelectOption extends Vue {
	@Prop({ type: String })
	private readonly optionId!: string;
}
</script>
