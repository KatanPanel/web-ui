<template>
	<div :class="$style.root" tabindex="1">
		<VRow>
			<VCol :size="9">
				<div :class="$style.info">
					<VIcon :name="createIconName()" :class="$style.icon" />
					<div :class="$style.nameAndId">
						<span :class="$style.name" v-text="networkName" />
						<code :class="$style.id" v-text="networkId" />
					</div>
				</div>
			</VCol>
			<!-- TODO include network type -->
			<!--			<VCol :size="3">-->
			<!--				<div :class="$style.type" />-->
			<!--			</VCol>-->
		</VRow>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VIcon from "@/design-system/icon/VIcon.vue";
import VSubtitle1 from "@/design-system/typography/VSubtitle1.vue";
import VRow from "@/design-system/grid/VRow.vue";
import VCol from "@/design-system/grid/VCol.vue";

@Component({
	components: { VRow, VCol, VIcon, VSubtitle1 }
})
export default class InstanceNetworkConnectedNetworksListItem extends Vue {
	@Prop({ type: String, required: true })
	private readonly networkId!: string;

	@Prop({ type: String, required: true })
	private readonly networkName!: string;

	createIconName(): string {
		// TODO customize icon based on network type and/or availability
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
	border-radius: 8px;
	padding: 0.8rem;
	color: var(--kt-content-primary);
	background-color: var(--kt-content-primary-overlay);

	svg {
		width: 24px;
		height: 24px;
	}
}

.info {
	display: flex;
	flex-direction: row;
	align-items: center;
	user-select: none;
}

.id {
	font-size: 12px;
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
	user-select: none;
}
</style>
