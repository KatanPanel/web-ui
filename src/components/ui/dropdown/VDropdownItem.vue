<template>
	<li class="v--dropdown-item">
		<slot />
	</li>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VDropdownItem extends Vue {}
</script>
