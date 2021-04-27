<template>
	<div :class="{ 'v--input-group-inlined': inlined }" class="v--input-group">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VInputGroup extends Vue {
	@Prop({ type: Boolean, default: false }) private readonly inlined!: boolean;
}
</script>
