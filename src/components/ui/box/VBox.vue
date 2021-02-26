<template>
	<div class="v--box" :class="{ 'v--box-outlined': outlined }">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VBox extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly outlined!: boolean;
}
</script>
