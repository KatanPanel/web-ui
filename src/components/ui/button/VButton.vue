<template>
	<button
		v-if="!link"
		:class="classProps"
		class="v--button"
		@click.stop="$emit('click', $event)"
	>
		<slot />
	</button>
	<router-link
		v-else-if="to"
		:class="classProps"
		:to="to"
		class="v--button"
		tag="a"
		@click.stop="$emit('click', $event)"
	>
		<slot />
	</router-link>
	<a
		v-else
		key="as-link"
		:class="classProps"
		class="v--button"
		@click.stop="$emit('click', $event)"
	>
		<slot />
	</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RawLocation } from "vue-router";

@Component
export default class VButton extends Vue {
	@Prop({ type: Boolean, default: false }) private readonly link!: boolean;
	@Prop({ type: Object }) private readonly to!: RawLocation;
	@Prop({ type: Boolean, default: false }) private readonly flat!: boolean;
	@Prop({ type: Boolean, default: false }) private readonly primary!: boolean;
	@Prop({ type: Boolean, default: false }) private readonly danger!: boolean;
	@Prop({ type: Boolean, default: false })
	private readonly outlined!: boolean;
	@Prop({ type: Boolean, default: false })
	private readonly fullWidth!: boolean;

	private get classProps() {
		return {
			"v--button-flat": this.flat,
			"v--button-primary": this.primary,
			"v--button-danger": this.danger,
			"v--button-fw": this.fullWidth,
			"v--button-outlined": this.outlined,
		};
	}
}
</script>
