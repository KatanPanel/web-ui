<template>
	<input
		@input="$emit('input', $event.target.value, $event)"
		v-bind="{
			'aria-required': required,
			'aria-label': label,
			'aria-disabled': disabled
		}"
		:disabled="disabled"
		:required="required"
		class="v--input"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VFormInput extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly required!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly disabled!: boolean;

	@Prop({ type: String })
	private readonly label!: string;
}
</script>
