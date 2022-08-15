<template>
	<main :class="$style.root">
		<router-view />
	</main>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class App extends Vue {}
</script>

<style lang="scss" module>
.root {
	display: flex;
	display: -ms-flexbox;
	flex-direction: column;
	height: 100%;
}
</style>

<style lang="scss">
#app {
	display: flex;
	display: -ms-flexbox;
	flex-direction: column;
	height: 100%;
}
</style>
