<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";

@Component<App>({
	metaInfo(): MetaInfo {
		return {
			title: "Home",
			titleTemplate: `%s | ${process.env.VUE_APP_NAME} ${process.env.VUE_APP_VERSION}`
		};
	}
})
export default class App extends Vue {
}
</script>
<style lang="scss" src="./assets/main.scss"></style>