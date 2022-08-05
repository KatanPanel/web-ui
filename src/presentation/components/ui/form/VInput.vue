<template>
	<input
		v-bind="{
			disabled: disabled,
			readonly: disabled,
			'aria-disabled': disabled,
			'aria-readonly': disabled,
			placeholder: placeholder,
		}"
		:class="$style.root"
		:value="$props.modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component({
	emits: ["update:modelValue"],
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
	box-shadow: inset 0 0 0 1.5px var(--kt-border-low);

	&:not([disabled], [readonly], :focus):hover {
		box-shadow: inset 0 0 0 1.5px var(--kt-border-medium);
	}

	&:not([readonly], [disabled]):focus {
		box-shadow: inset 0 0 0 1.5px var(--kt-content-primary);
	}

	&[readonly] {
		user-select: none;
		cursor: default;
	}

	&[disabled] {
		opacity: 0.38;
		cursor: not-allowed;
	}
}
</style>
