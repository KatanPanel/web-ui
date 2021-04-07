<template>
	<form action="#" class="v--form">
		<slot />
	</form>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class VForm extends Vue {}
</script>
