<template>
	<input
		@input="$emit('input', $event.target.value, $event)"
		class="v--input"
	/>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class VInput extends Vue {}
</script>
