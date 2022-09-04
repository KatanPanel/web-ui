<template>
	<input
		:class="$style.root"
		v-bind="{
			disabled: disabled,
			readonly: disabled,
			'aria-disabled': disabled,
			'aria-readonly': disabled,
			placeholder: placeholder
		}"
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
		font-family: var(--kt-body-font);
		font-weight: 600;
		opacity: 0.54;
	}
}
</style>
