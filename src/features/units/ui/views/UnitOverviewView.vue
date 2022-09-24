<template>
	<VContainer>
		<PageHeader>
			<template #title> Overview </template>
		</PageHeader>
		<VCard>
			<div :class="$style.details">
				<div :class="$style.iconWrapper">
					<Avatar
						:src="unit.icon"
						:class="$style.icon"
						label="Unit icon"
					/>
				</div>
				<div :class="$style.info">
					<VRow>
						<VCol :size="4">
							<VLabel>Unit name</VLabel>
							<p>{{ unit.name }}</p>
						</VCol>
					</VRow>
				</div>
			</div>
		</VCard>
	</VContainer>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/design-system/grid/VContainer.vue";
import VCol from "@/design-system/grid/VCol.vue";
import VRow from "@/design-system/grid/VRow.vue";
import VLabel from "@/design-system/form/VLabel.vue";
import Avatar from "@/features/shared/ui/components/Avatar.vue";
import VCard from "@/design-system/card/VCard.vue";

@Component({
	components: { PageHeader, VContainer, VRow, VCol, VLabel, Avatar, VCard }
})
export default class UnitOverviewView extends Vue {
	@Inject()
	readonly unit!: Unit;
}
</script>

<style lang="scss" module>
.details {
	display: flex;
	align-items: center;
}

.iconWrapper {
	margin-right: 1.6rem;
	flex-shrink: 1;
}

.icon {
	width: 64px;
	height: 64px;
}

.info {
	flex-grow: 1;
}
</style>
