<template>
	<img
		v-svg-inline
		:alt="`${name} icon`"
		:src="`/img/icons/${name}.svg`"
		class="v--icon"
	/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class VIcon extends Vue {
	@Prop({ type: String, required: true }) private readonly name!: string;
}
</script>
