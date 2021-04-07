<template>
	<div class="v--box-header">
		<slot />
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class VBoxHeader extends Vue {}
</script>
