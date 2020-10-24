<template>
	<div id="app">
		<the-navbar />
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
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
import { SET_THEME } from "@/store/actions";

@Component({
	components: { TheFooter, TheNavbar },
	metaInfo(): MetaInfo {
		return {
			title: "Home",
			titleTemplate: `%s | ${process.env.VUE_APP_NAME} ${process.env.VUE_APP_VERSION}`,
		};
	},
})
export default class App extends Vue {
	mounted() {
		if (this.$storage.has("theme")) {
			this.$store.dispatch(SET_THEME, this.$storage.get("theme"));
		}
	}
}
</script>
<style lang="scss" src="./assets/styles/main.scss"></style>
