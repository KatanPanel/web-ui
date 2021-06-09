<template>
	<li v-if="!link"
		class="v--dropdown-item"
		@click="$emit('click', $event)"
	>
		<slot />
	</li>
	<router-link v-else :to="link" class="v--dropdown-item">
		<slot />
	</router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RawLocation } from "vue-router";

@Component
export default class VDropdownItem extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly link!: RawLocation;
}
</script>
<style lang="scss" scoped>
.v--dropdown-item {
	padding: 12px;
	display: flex;
	border-radius: 4px;
	font-weight: 500;
	justify-content: flex-start;

	&:hover {
		background-color: var(--kt-primary-color);
		cursor: pointer;
		color: var(--kt-primary-text-color);
	}

	a {
		display: block;
		height: 100%;
		width: 100%;
		position: relative;
		text-decoration: none;
	}
}
</style>
