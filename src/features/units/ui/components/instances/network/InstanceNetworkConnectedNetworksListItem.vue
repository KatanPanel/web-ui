<template>
	<div :class="$style.root">
		<VRow>
			<VCol :size="9">
				<div :class="$style.info">
					<VIcon :name="createIconName()" :class="$style.icon" />
					<div :class="$style.nameAndId">
						<span v-text="networkName" :class="$style.name" />
						<code v-text="networkId" :class="$style.id" />
					</div>
				</div>
			</VCol>
			<VCol :size="3">
				<div :class="$style.type">Unknown</div>
			</VCol>
		</VRow>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import VSubtitle1 from "@/features/shared/ui/components/design-system/typography/VSubtitle1.vue";
import VRow from "@/features/shared/ui/components/design-system/grid/VRow.vue";
import VCol from "@/features/shared/ui/components/design-system/grid/VCol.vue";

@Component({
	components: { VRow, VCol, VIcon, VSubtitle1 }
})
export default class InstanceNetworkConnectedNetworksListItem extends Vue {
	@Prop({ type: String, required: true })
	private readonly networkId!: string;

	@Prop({ type: String, required: true })
	private readonly networkName!: string;

	createIconName(): string {
		return "LanConnect";
	}

	isDefaultNetwork(): boolean {
		return this.networkName === "katan0";
	}

	isSecureNetwork(): boolean {
		return false;
	}
}
</script>
<style lang="scss" module>
.root {
	align-items: center;
	padding: 1.2rem 0;

	&:not(:last-child) {
		border-bottom: 1px solid var(--kt-border-low);
		margin-bottom: 0.8rem;
	}
}

.icon {
	margin-right: 1.6rem;
	color: var(--kt-content-neutral-high);

	svg {
		width: 24px;
		height: 24px;
	}
}

.info {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.id {
	font-size: 11px;
	color: var(--kt-content-neutral);
}

.name {
	font-weight: 600;
	font-size: 15px;
}

.nameAndId {
	display: flex;
	flex-direction: column;
}

.type {
}
</style>
