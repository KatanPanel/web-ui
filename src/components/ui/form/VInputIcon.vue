<template>
	<div class="v--input-icon">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VInputIcon extends Vue {}
</script>
