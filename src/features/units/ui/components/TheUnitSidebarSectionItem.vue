<template>
	<div v-if="href && !disabled" :class="$style.root">
		<router-link :to="href" :class="$style.link" class="link">
			<ProgressiveImage
				v-if="isExternalIcon()"
				:src="icon"
				:class="$style.icon"
			/>
			<VIcon v-else :name="icon" :class="$style.icon" />
			<span :class="$style.text" class="text">
				<slot />
			</span>
		</router-link>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import isURL from "validator/lib/isURL";

@Component({
	components: { VIcon }
})
export default class TheUnitSidebarSectionItem extends Vue {
	@Prop({ type: Object, required: true })
	readonly href!: RouteLocationRaw;

	@Prop({ type: String, required: true })
	readonly icon!: string;

	@Prop({ type: Boolean, default: false })
	readonly disabled!: boolean;

	isExternalIcon(): boolean {
		return isURL(this.icon);
	}
}
</script>

<style lang="scss" module>
.root:not(:last-child) {
	margin-bottom: 0.4rem;
}

.link {
	text-decoration: none;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-weight: 600;
	font-size: 14px;
	border-radius: 8px;
	padding: 0.8rem 1.6rem;
	margin: 0 0.8rem;
	color: var(--kt-content-neutral);
}

.icon {
	width: 24px;
	height: 24px;
	margin-right: 1.2rem;
	flex-shrink: 0;
}

.text {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	align-self: center;
	position: relative;
	font-weight: 600;
	font-family: var(--kt-headline-font);
}
</style>
<style lang="scss" scoped>
.link {
	&:not(.router-link-exact-active):hover .text {
		//background-color: var(--kt-background-surface-hover);
		color: var(--kt-content-neutral-high);
	}

	&.router-link-exact-active {
		background-color: var(--kt-background-surface-high);
		color: var(--kt-content-neutral-high);
	}
}
</style>
