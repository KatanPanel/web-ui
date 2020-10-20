<template>
	<div class="panel">
		<router-view />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Panel extends Vue {}
</script>
