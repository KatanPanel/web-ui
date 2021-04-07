<template>
	<div class="v--flex">
		<slot />
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class VFlexBox extends Vue {}
</script>
