<template>
	<input
		v-bind="{
			disabled: disabled,
			readonly: disabled,
			'aria-disabled': disabled,
			'aria-readonly': disabled
		}"
		class="v--input"
		@input="$emit('input', $event.target.value, $event)"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VInput extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly disabled!: boolean;

	@Prop({ type: String })
	private readonly label!: string;
}
</script>
