<template>
	<button
		:class="[
			$style.component,
			{
				[$style.styleOutlined]: styleOutlined,
				[$style.styleFlat]: styleFlat,
				[$style.styleBlock]: styleBlock,
				[$style.colorPrimary]: colorPrimary,
				[$style.colorDanger]: colorDanger
			}
		]"
		:disabled="disabled"
		:tabindex="disabled ? -1 : 0"
		type="button"
		@click="$emit('click', $event)"
		@keydown.enter="$emit('keydown', $event)"
	>
		<slot />
	</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VButton extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly colorDanger!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly colorPrimary!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly styleOutlined!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly styleFlat!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly styleBlock!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly disabled!: boolean;
}
</script>
<style lang="scss" module>
.component {
	text-decoration: none;
	opacity: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	border-radius: 4px;
	outline: none;
	appearance: none;
	-webkit-appearance: none;
	height: 36px;
	line-height: 36px;
	vertical-align: middle;
	border: 1px solid transparent;
	min-width: 72px;
	user-select: none;
	position: relative;
	padding: 0 12px;
	background-color: transparent;
	color: currentColor;

	svg {
		width: 20px;
		height: 20px;
		margin-right: 8px;
	}

	&[disabled] {
		opacity: 0.54;
	}

	&:not([disabled]):hover,
	&:not([disabled]):focus {
		cursor: pointer;
		text-decoration: underline;
	}
}

.colorPrimary {
	background-color: var(--kt-primary-color);
	border-color: var(--kt-primary-color);
	color: var(--kt-primary-text-color);

	&:not([disabled]):hover {
		text-decoration: none;
	}

	&:not([disabled]):hover,
	&:not([disabled]):focus {
		background-color: var(--kt-primary-darker-color);
		border-color: var(--kt-primary-darker-color);
	}
}

.colorDanger {
	background-color: var(--kt-danger-color);
	border-color: var(--kt-danger-color);
	color: var(--kt-primary-text-color);

	&:not([disabled]):hover {
		text-decoration: none;
		background-color: var(--kt-danger-darker-color);
		border-color: var(--kt-danger-darker-color);
	}
}

.styleOutlined {
	background-color: transparent;
	border-color: var(--kt-border-color);

	&:hover {
		background-color: transparent;
		color: var(--kt-primary-color);
		text-decoration: underline;
	}

	&.colorPrimary {
		color: var(--kt-primary-color);

		&:not([disabled]):hover,
		&:not([disabled]):focus {
			background-color: transparent;
			border-color: var(--kt-primary-darker-color);
		}
	}

	&.colorDanger,
	&.colorDanger:not([disabled]):hover,
	&.colorDanger:not([disabled]):focus {
		color: var(--kt-danger-color);
		border-color: var(--kt-danger-color);
	}
}

.styleFlat {
	background-color: transparent;
	color: var(--kt-primary-color);

	&:hover {
		background-color: transparent;
		color: var(--kt-primary-darker-color);
	}

	&.colorDanger {
		color: var(--kt-danger-color);

		&:not([disabled]):hover {
			color: var(--kt-danger-darker-color);
		}
	}
}

.styleBlock {
	width: 100%;
}
</style>
