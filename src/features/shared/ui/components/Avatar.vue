<template>
	<div
		v-if="!source"
		:class="$style.root"
		:style="{
			backgroundImage: `url(${source})`
		}"
	/>
	<ProgressiveImage
		v-else
		@error="onLoadError"
		:class="$style.root"
		:src="source"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { isUndefined } from "@/utils";
// noinspection TypeScriptCheckImport
import { ProgressiveImage } from "vue-progressive-image";
import logService from "@/features/shared/data/log.service";

@Component({
	components: { ProgressiveImage }
})
export default class Avatar extends Vue {
	@Prop({ type: String })
	private readonly src?: string | undefined;

	@Prop({ type: String, required: true })
	private readonly label!: string;

	get source(): string {
		return isUndefined(this.src) ? "/img/logo-black.svg" : this.src;
	}

	onLoadError(error: Error) {
		logService.error("Failed to load avatar", error);
	}
}
</script>

<style lang="scss" module>
.root {
	width: 100%;
	height: 100%;
	box-shadow: 0 0 4px 0 RGB(0 0 0 / 12%) inset;
	border-radius: 50%;
	background-size: cover;
	background-position: center;
	background-color: var(--kt-background-surface-high);
}
</style>
