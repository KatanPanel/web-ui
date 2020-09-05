<template>
	<div class="v--box">
		<slot />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class VBox extends Vue {
}
</script>