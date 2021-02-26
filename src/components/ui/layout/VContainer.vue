<template>
	<div class="v--container">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VContainer extends Vue {}
</script>
