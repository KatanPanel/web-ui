<template>
	<component id="app" v-if="!!layout" :is="layout">
		<router-view />
	</component>
	<div v-else>
		<router-view />
	</div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

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
