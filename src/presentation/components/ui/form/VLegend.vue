<template>
	<legend>
		<slot />
	</legend>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VLegend extends Vue {}
</script>
