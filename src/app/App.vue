<template>
	<div id="app" class="app">
		<router-view />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
<style lang="scss" src="../assets/styles/main.scss" />
<style lang="scss" scoped>
.app {
	display: flex;
	display: -ms-flexbox;
	flex-direction: column;
	height: 100%;
}
</style>
