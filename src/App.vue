<template>
	<component id="app" v-if="!!layout" :is="layout">
		<router-view />
	</component>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { FALLBACK_LANGUAGE, setLanguage } from "@/i18n";
import { DARK_THEME } from "@/store/state";
import { dispatch } from "@/utils/vuex";
import { UPDATE_THEME } from "@/store/actions";
import { ROOT_MODULE, THEME_CACHE_KEY } from "@/store";
import { AxiosError, AxiosResponse } from "axios";

@Component<App>({
	metaInfo(): MetaInfo {
		return {
			titleTemplate: `${process.env.VUE_APP_NAME}`,
		};
	},
	beforeCreate(): void {
		// setLanguage needs to be here to load Vuex.
		setLanguage(FALLBACK_LANGUAGE);

		if (!this.$storage.has(THEME_CACHE_KEY)) {
			if (
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
			)
				dispatch(ROOT_MODULE, UPDATE_THEME, {
					theme: DARK_THEME,
				});
			return;
		} else
			dispatch(ROOT_MODULE, UPDATE_THEME, {
				theme: this.$storage.get(THEME_CACHE_KEY).theme,
			});
	},
	created() {
		this.$http
			.get("/")
			.then((res: AxiosResponse) => {
				console.log(res);
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	},
})
export default class App extends Vue {
	private get layout(): string | null {
		const value =
			this.$route.meta.layout || this.$route.matched[0]?.meta.layout;

		if (!value) return null;

		return `${value}-layout`;
	}
}
</script>
<style lang="scss" src="./assets/styles/main.scss" />
