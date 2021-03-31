<template>
	<button v-if="!link" :class="classProps" class="v--button">
		<slot />
	</button>
	<a v-else key="as-link" :class="classProps" class="v--button">
		<slot />
	</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VButton extends Vue {
	@Prop({ type: Boolean, default: false }) private readonly link!: boolean;
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
