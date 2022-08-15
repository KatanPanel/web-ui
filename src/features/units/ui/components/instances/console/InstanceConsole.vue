<template>
	<div :class="$style.root">
		<pre>
			<code v-for="i in 10" :key="`line-${i}`">
			Text {{ i }}
		</code>
		</pre>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class InstanceConsole extends Vue {}
</script>

<style lang="scss" module>
.root {
	max-height: 100%;
}
</style>
