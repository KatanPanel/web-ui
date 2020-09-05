<template>
	<div class="v--button">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VButton extends Vue {
}
</script>