<template>
	<component id="app" v-if="!!layout" :is="layout">
		<router-view />
	</component>
	<div v-else>
		<router-view />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Module } from "@vue-ioc/core";
import { ConfigService } from "@/services/config";
import { LoggingService } from "@/services/logging";

@Module({
	providers: [
		LoggingService,
		{
			provide: ConfigService,
			useFactory(): any {
				return Vue.prototype.$config;
			}
		}
	]
})
@Component
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
