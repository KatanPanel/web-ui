<template>
	<VContainer>
		<PageHeader :no-divider="true">
			<template #title> Upload Files </template>
		</PageHeader>
		<div :class="$style.uploadArea">
			<div :class="$style.uploadArea__icon">
				<VIcon name="FileUpload" />
			</div>
			<div :class="$style.uploadArea__text">
				Drag & drop files your files here or
				<span :class="$style.uploadArea__chooseFile">choose file</span>
			</div>
			<p :class="$style.uploadArea__hint">500 MB max file size</p>
		</div>
	</VContainer>
</template>

<script lang="ts">
import VContainer from "@/design-system/grid/VContainer.vue";
import VIcon from "@/design-system/icon/VIcon.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import { Component, Vue } from "vue-facing-decorator";

@Component({
	components: { VContainer, VIcon, PageHeader }
})
export default class InstanceFsUploadFile extends Vue {}
</script>

<style lang="scss" module>
.uploadArea {
	border: 2px dashed var(--kt-border-medium);
	border-radius: 8px;
	padding: 2.4rem;
	min-height: 240px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.uploadArea__icon {
	color: var(--kt-content-neutral-low);
	border-radius: 50%;
	margin-bottom: 1.6rem;

	svg {
		width: 48px;
		height: 48px;
	}
}

.uploadArea__text {
	color: var(--kt-content-neutral-high);
	font-size: 18px;
	font-weight: 500;
	letter-spacing: -0.625px;
	user-select: none;
}

.uploadArea__hint {
	color: var(--kt-content-neutral);
	font-size: 14px;
	font-weight: 500;
	margin-top: 0.8rem;
	user-select: none;
}

.uploadArea__chooseFile {
	color: var(--kt-content-primary);
}
</style>
