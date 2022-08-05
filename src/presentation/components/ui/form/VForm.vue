<template>
	<form>
		<slot />
	</form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VForm extends Vue {}
</script>
