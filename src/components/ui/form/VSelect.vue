<template>
	<div v-cloak :active="isOpen" class="v--input v--select" @click="toggle">
		<div
			v-if="selected"
			key="selected-option"
			:class="selected.classes || []"
			class="v--select-current-value"
		>
			{{ selected.value }}
		</div>
		<div v-else key="no-value-selected" class="v--select-option-unselected">
			{{ $t("ui.form.select") }}
		</div>
		<div ref="list" class="v--select-option-list">
			<v-select-option
				v-for="option in options"
				:key="option.id"
				:active="selected !== null && selected.id === option.id"
				:class="option.classes || []"
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
import { undefinedToNull } from "@/utils/any";

export interface SelectOption {
	readonly id: string;

	readonly value: string;

	active?: boolean;

	classes?: string[];
}

@Component<VSelect>({
	components: { VSelectOption, VIcon },
	beforeMount(): void {
		const defaultOption = undefinedToNull(
			this.options.find((option: SelectOption) => option.active)
		);

		if (defaultOption) this.select(defaultOption);
	},
	mounted(): void {
		if (this.selected !== null) this.$emit("change", this.selected);
	},
})
export default class VSelect extends Vue {
	@Prop({ type: Array, default: [] })
	private readonly options!: SelectOption[];
	private selected: SelectOption | null = null;
	private isOpen = false;

	toggle(): void {
		this.isOpen = !this.isOpen;
	}

	select(option: SelectOption): void {
		if (this.selected === option) return;

		const old = this.selected;
		this.selected = option;
		this.$emit("change", option, old);
	}
}
</script>
