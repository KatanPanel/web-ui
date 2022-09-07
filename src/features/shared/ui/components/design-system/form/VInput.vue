<template>
	<input
		v-bind="{
			disabled: disabled,
			readonly: disabled,
			'aria-disabled': disabled,
			'aria-readonly': disabled,
			placeholder: placeholder
		}"
		:class="$style.root"
		@input="onInputChange($event.target.value)"
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

	onInputChange(value: string) {
		this.$emit("update:modelValue", value);
	}
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
	letter-spacing: 0.25px;
	background-color: var(--kt-background-surface);

	&[readonly] {
		user-select: none;
		cursor: default;
		font-weight: 500;
	}

	&[disabled] {
		opacity: 0.38;
		user-select: none;
		cursor: not-allowed;
	}

	&::placeholder {
		opacity: 0.54;
	}
}
</style>
