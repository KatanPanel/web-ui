<template>
	<div class="v--row">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VRow extends Vue {
}
</script>