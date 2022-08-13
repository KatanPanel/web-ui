<template>
	<Component :is="getComponent" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class VIcon extends Vue {
	@Prop({ type: String, required: true })
	private readonly name!: string;

	get getComponent() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return require(/* webpackChunkName: "icon-[request]" */
		"vue-material-design-icons/" + this.name + ".vue").default;
	}
}
</script>
