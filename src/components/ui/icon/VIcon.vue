<template>
	<img
		v-svg-inline
		:alt="`${name} icon`"
		:src="`img/icons/${name}.svg`"
		class="v--icon"
	>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VIcon extends Vue {
	@Prop({ type: String, required: true }) private readonly name!: string;
}
</script>
<style lang="scss">
.v--icon {
	width: 24px;
	height: 24px;
	fill: var(--app-text-color);
}
</style>
