<template>
	<div id="app">
		<the-navbar />
		<router-view />
		<the-footer />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import { MetaInfo } from "vue-meta";
import { loadLanguage } from "@/i18n";
import { Dictionary } from "vue-router/types/router";

@Component({
	components: { TheFooter, TheNavbar },
	metaInfo(): MetaInfo {
		return {
			title: "Home",
			titleTemplate: `%s | ${process.env.VUE_APP_NAME} ${process.env.VUE_APP_VERSION}`,
		};
	},
})
export default class App extends Vue {}
</script>
<style lang="scss" src="./assets/styles/main.scss"></style>
