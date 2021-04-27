<template>
	<label class="v--label">
		<slot />
	</label>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VLabel extends Vue {}
</script>
