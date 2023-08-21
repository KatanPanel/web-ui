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
import { Unit } from "@/features/units/api/models/unit.model";
import PageHeader from "@/features/platform/ui/components/PageHeader.vue";
import VContainer from "@/features/platform/ui/components/grid/VContainer.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import Avatar from "@/features/platform/ui/components/Avatar.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";

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
