<template>
	<div class="v--select-option">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VSelectOption extends Vue {}
</script>
