<template>
	<li class="v--dropdown-item" @click="$emit('click', $event)">
		<slot />
	</li>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class VDropdownItem extends Vue {}
</script>
