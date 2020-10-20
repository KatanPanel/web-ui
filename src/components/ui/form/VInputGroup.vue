<template>
	<div class="v--input-group">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VInputGroup extends Vue {}
</script>
