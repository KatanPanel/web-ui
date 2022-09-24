<template>
	<VCard
		:hoverable="true"
		:active="isSelected"
		:disabled="disabled"
		:aria-disabled="disabled"
		@click="onSelect"
		class="root"
	>
		<div class="radio" @click="onSelect" />
		<div class="content">
			<div class="title">
				<slot name="title" />
			</div>
			<div v-if="$slots.description" class="description">
				<slot name="description" />
			</div>
		</div>
	</VCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VCard from "@/design-system/card/VCard.vue";

@Component({
	components: { VCard }
})
export default class VSelectableCard extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly selected!: boolean;
	@Prop({ type: Boolean, default: false })
	private readonly disabled!: boolean;

	_selected = this.selected;

	get isSelected(): boolean {
		return this._selected;
	}

	onSelect() {
		console.log("selected", this._selected);
		this._selected = !this._selected;
	}
}
</script>

<style lang="scss" scoped>
.root {
	&[active="true"] {
		.radio {
			background-color: var(--kt-content-primary-hover);
		}
	}
}
.radio {
	width: 28px;
	height: 28px;
	border-radius: 50%;
	background-color: var(--kt-background-surface-high);
	margin: 0 8px;

	&:hover {
		cursor: pointer;
	}
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 1.6rem;
	flex-grow: 1;

	.title {
		font-weight: 500;
		color: var(--kt-content-neutral-high);
		font-size: 15px;
	}

	.description {
		color: var(--kt-content-neutral-low);
		font-size: 12px;
	}
}
</style>
