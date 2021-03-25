<template>
	<div v-cloak :active="isOpen" class="v--input v--select" @click="toggle">
		<div v-if="selected" key="selected-option">
			{{ selected.value }}
		</div>
		<div v-else key="no-value-selected" class="v--select-option-unselected">
			Selecionar
		</div>
		<div ref="list" class="v--select-option-list">
			<v-select-option
				v-for="option in options"
				:key="option.id"
				:active="selected === option"
				@click.native="select(option)"
				>{{ option.value }}
			</v-select-option>
		</div>
		<div class="v--select-caret">
			<v-icon name="caret-down" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VSelectOption from "@/components/ui/form/VSelectOption.vue";
import { undefinedToNull } from "@/common/utils/any";

interface Option {
	readonly id: string;

	readonly value: string;

	active?: boolean;
}

@Component<VSelect>({
	components: { VSelectOption, VIcon },
	beforeMount(): void {
		const defaultOption = undefinedToNull(
			this.options.find((option: Option) => option.active)
		);

		if (defaultOption) this.select(defaultOption);
	},
})
export default class VSelect extends Vue {
	@Prop({ type: Array, default: [] }) private readonly options!: Option[];
	private selected: Option | null = null;
	private isOpen = false;

	toggle(): void {
		this.isOpen = !this.isOpen;
	}

	select(option: Option): void {
		if (this.selected === option) return;

		const old = this.selected;
		this.selected = option;
		this.$emit("change", option, old);
	}
}
</script>
