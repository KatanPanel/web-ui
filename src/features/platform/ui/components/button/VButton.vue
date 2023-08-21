<template>
	<router-link
		v-if="to"
		:class="getClasses()"
		:tabindex="disabled ? -1 : 0"
		:to="to"
		type="button"
		v-bind="{ disabled }"
		@click="$emit('click')"
		@keydown.enter="$emit('keydown', $event)"
	>
		<slot />
	</router-link>
	<button
		type="button"
		v-else
		:class="getClasses()"
		:disabled="disabled"
		:tabindex="disabled ? -1 : 0"
		@click="$emit('click', $event)"
		@keydown.enter="$emit('keydown', $event)"
	>
		<slot />
	</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";

@Component({
	emits: ["click", "keydown"]
})
export default class VButton extends Vue {
	@Prop({ type: Boolean }) readonly disabled!: boolean;
	@Prop({ type: Boolean }) readonly flat!: boolean;
	@Prop({
		type: String,
		validator(value: string): boolean {
			return value == "primary";
		}
	})
	readonly variant!: "primary";
	@Prop({ type: Boolean }) readonly block!: boolean;
	@Prop({ type: Object }) readonly to!: RouteLocationRaw;

	getClasses(): unknown {
		return [
			"root",
			`variant--${this.variant}`,
			{
				flat: this.variant,
				block: this.block
			}
		];
	}
}
</script>
<style lang="scss" scoped>
.root {
	text-decoration: none;
	opacity: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 14px;
	border-radius: 8px;
	outline: none;
	appearance: none;
	-webkit-appearance: none;
	vertical-align: middle;
	border: 1px solid transparent;
	user-select: none;
	position: relative;
	height: 36px;
	padding: 0.8rem 1.6rem;
	font-family: var(--kt-body-font);
	background-color: var(--kt-background-surface-high);
	color: var(--kt-content-neutral);

	&:hover,
	&:focus {
		text-decoration: none !important;
		background-color: var(--kt-background-surface-hover);
		color: var(--kt-content-neutral-high);
	}

	&[disabled="true"] {
		opacity: 0.38;
	}

	&:not([disabled="true"]):hover,
	&:not([disabled="true"]):focus {
		cursor: pointer;
		text-decoration: underline;
	}
}

.flat {
	background-color: transparent;
	color: var(--kt-content-primary);

	&:hover:not([disabled="true"]) {
		background-color: var(--kt-content-primary-hover);
	}
}

.block {
	width: 100%;
}

.variant--primary {
	background-color: var(--kt-content-primary);
	border-color: var(--kt-content-primary);
	color: var(--kt-content-primary-oncolor);

	&:not([disabled="true"]):hover,
	&:not([disabled="true"]):focus {
		background-color: var(--kt-content-primary-hover);
		border-color: var(--kt-content-primary-hover);
		color: var(--kt-content-primary-oncolor);
	}
}

.variant--outlined {
	background-color: transparent;
	border-color: var(--kt-border-color);
	color: var(--kt-primary-color);

	&:hover {
		background-color: transparent;
		color: var(--kt-primary-color);
		text-decoration: underline;
	}

	&:not([disabled="true"]):hover,
	&:not([disabled="true"]):focus {
		background-color: transparent;
		border-color: var(--kt-primary-darker-color);
	}
}
</style>
