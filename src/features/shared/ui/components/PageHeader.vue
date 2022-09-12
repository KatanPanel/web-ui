<template>
	<div
		:class="[
			$style.root,
			{
				[$style.root__nodivider]: noDivider
			}
		]"
	>
		<h4 :class="$style.title">
			<slot name="title">
				<span v-if="titleTranslationKey" v-t="titleTranslationKey" />
			</slot>
		</h4>
		<VBody2
			v-if="$slots.subtitle || subtitleTranslationKey"
			:class="$style.subtitle"
		>
			<slot name="subtitle">
				<span
					v-if="subtitleTranslationKey"
					v-t="subtitleTranslationKey"
				/>
			</slot>
		</VBody2>
		<div v-if="$slots.default" :class="$style.body">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";

@Component({
	components: { VBody2 }
})
export default class PageHeader extends Vue {
	@Prop({ type: String, required: false })
	private readonly titleTranslationKey!: string;

	@Prop({ type: String, required: false })
	private readonly subtitleTranslationKey!: string;

	@Prop({ type: Boolean, default: false })
	private readonly noDivider!: boolean;
}
</script>

<style lang="scss" module>
.root {
	margin: 4.8rem 0 2.4rem;
	padding-bottom: 1.6rem;
	border-bottom: 1px solid var(--kt-border-medium);
}

.root__nodivider {
	border-bottom: none;
	padding-bottom: 0;
}

.title {
	font-weight: 700;
	font-family: var(--kt-headline-font);
	user-select: none;
}

.subtitle {
	margin-top: 1.6rem;
	color: var(--kt-content-neutral);
	font-size: 14px;
}

.body {
	margin-top: 1.2rem;
}
</style>
