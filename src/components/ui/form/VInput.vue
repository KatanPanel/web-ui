<template>
	<input
		class="v--input"
		type="text"
		@input="$emit('input', $event.target.value)"
	>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VInput extends Vue {}
</script>
