<template>
	<component id="app" v-if="!!layout" :is="layout">
		<router-view />
	</component>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { FALLBACK_LANGUAGE, setLanguage } from "@/i18n";
import { THEME_STORAGE_KEY } from "@/store/mutations";
import { SET_THEME } from "@/store/actions";

@Component({
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("pages-title.home")! as string,
			titleTemplate: `%s | ${process.env.VUE_APP_NAME}`,
		};
	},
})
export default class App extends Vue {
	private get layout() {
		const value =
			this.$route.meta.layout || this.$route.matched[0]?.meta.layout;
		if (!value) return null;

		return `${value}-layout`;
	}

	public created(): void {
		setLanguage(FALLBACK_LANGUAGE);
	}

	public mounted(): void {
		if (this.$storage.has(THEME_STORAGE_KEY)) {
			this.$store.dispatch(SET_THEME, {
				theme: this.$storage.get(THEME_STORAGE_KEY).theme,
			});
		}
	}
}
</script>
<style lang="scss" src="./assets/styles/main.scss" />
