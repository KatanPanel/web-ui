<template>
	<input
		:class="$style.root"
		:value="$props.modelValue"
		v-bind="{
			disabled: disabled,
			readonly: disabled,
			'aria-disabled': disabled,
			'aria-readonly': disabled,
			placeholder: placeholder
		}"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component({
	emits: ["update:modelValue"]
})
export default class VInput extends Vue {
	@Prop({ type: Boolean }) readonly disabled!: boolean;
	@Prop({ type: String }) readonly placeholder!: string;
	@Prop({ type: String }) readonly modelValue!: string;
}
</script>
<style lang="scss" module>
.root {
	appearance: none;
	-webkit-appearance: none;
	outline: none;
	padding: 0 8px;
	height: 37px;
	font-weight: 500;
	font-size: 14px;
	width: 100%;
	border-radius: 8px;
	background-color: var(--kt-background-surface-high);

	&[readonly] {
		user-select: none;
		cursor: default;
	}

	&[disabled] {
		opacity: 0.38;
		user-select: none;
		cursor: not-allowed;
	}

	&::placeholder {
		font-family: var(--kt-headline-font);
		font-weight: 600;
		opacity: 0.54;
	}
}
</style>
