<template>
	<div ref="root" :class="$style.root" />
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-facing-decorator";
import { ActiveLoader } from "vue-loading-overlay";

@Component
export default class LoadingState extends Vue {
	@Ref()
	private readonly root!: HTMLElement;

	loader!: ActiveLoader;

	mounted() {
		this.loader = this.$loading.show({
			container: this.root,
			isFullPage: false,
			lockScroll: true
		});
	}

	destroyed() {
		this.loader.hide();
	}
}
</script>
<style lang="scss" module>
.root {
	position: relative;
	width: 100%;
	height: 72px;
}
</style>
