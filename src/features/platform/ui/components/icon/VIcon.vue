<template>
	<Component
		:is="component"
		:class="$style.root"
		:aria-label="`icon-${name}`"
	/>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import logService from "@/features/platform/api/log.service";
import { ConsolaLogObject } from "consola";

@Component
export default class VIcon extends Vue {
	@Prop({ type: String, required: true })
	private readonly name!: string;

	get component(): unknown {
		try {
			return this.requireIcon(this.name);
		} catch (e: unknown) {
			logService.error({
				message: "Icon not found",
				additional: [e],
				args: [this.name]
			} as ConsolaLogObject);
			return this.requireIcon("Help" /* fallback */);
		}
	}

	requireIcon(name: string): unknown {
		return require(/* webpackChunkName: "icon-[request]" */
		"vue-material-design-icons/" + name + ".vue").default;
	}
}
</script>
<style lang="scss" module>
.root {
	display: inline-block;

	svg {
		width: 100% !important;
		vertical-align: middle;
	}
}
</style>
