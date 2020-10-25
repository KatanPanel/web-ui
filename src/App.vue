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
import { SET_THEME } from "@/store/actions";
import { THEME_STORAGE_KEY } from "@/store/mutations";

@Component({
	components: { TheFooter, TheNavbar },
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("pages-title.home")! as string,
			titleTemplate: `%s | ${process.env.VUE_APP_NAME} ${process.env.VUE_APP_VERSION}`,
		};
	},
})
export default class App extends Vue {
	mounted(): void {
		const cache = this.$storage;
		if (cache.has(THEME_STORAGE_KEY))
			this.$store.dispatch(SET_THEME, cache.get(THEME_STORAGE_KEY));
	}
}
</script>
<style lang="scss" src="./assets/styles/main.scss"></style>
