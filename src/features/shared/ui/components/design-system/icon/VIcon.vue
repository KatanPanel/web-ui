<template>
	<Component
		:is="component"
		:class="$style.root"
		:aria-label="`icon-${name}`"
	/>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import logService from "@/features/shared/data/log.service";
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
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return require(/* webpackChunkName: "icon-[request]" */
		"vue-material-design-icons/" + name + ".vue").default;
	}
}
</script>
<style lang="scss" module>
.root svg {
	width: 100% !important;
}
</style>
