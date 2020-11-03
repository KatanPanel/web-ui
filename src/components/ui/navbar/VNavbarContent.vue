<template>
	<ul class="v--navbar-content">
		<slot />
	</ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VNavbarContent extends Vue {}
</script>
