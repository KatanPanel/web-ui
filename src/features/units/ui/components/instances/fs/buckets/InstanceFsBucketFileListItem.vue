<template>
	<VRow :class="$style.root">
		<VCol :size="4">
			<router-link :to="getRoute()" :class="$style.link">
				<VIcon :name="getIcon()" :class="$style.icon" />
				<span :class="$style.name">{{ fileName }}</span>
			</router-link>
		</VCol>
		<VCol :size="4">
			{{ toHumanReadableSize() }}
		</VCol>
		<VCol :size="4">
			{{ lastModified }}
		</VCol>
	</VRow>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-facing-decorator";
import { InstanceFsBucket } from "@/features/units/models/instance.model";
import filesize from "filesize";
import VIcon from "@/design-system/icon/VIcon.vue";
import { isUndefined } from "@/utils";
import { RouteLocationRaw } from "vue-router";
import VCol from "@/design-system/grid/VCol.vue";
import VRow from "@/design-system/grid/VRow.vue";

@Component({
	components: { VIcon, VRow, VCol }
})
export default class InstanceFsBucketFileListItem extends Vue {
	@Inject() readonly bucket!: InstanceFsBucket;
	@Prop({ type: Number, required: true }) readonly index!: number;
	@Prop({ type: String, required: true }) readonly fileName!: string;
	@Prop({ type: Number, required: true }) readonly size!: number;
	@Prop({ type: Boolean, default: false }) readonly isHidden!: boolean;
	@Prop({ type: Boolean, required: true }) readonly isDirectory!: boolean;
	@Prop({ type: Date }) readonly lastModified!: Date | undefined;

	getRoute(): RouteLocationRaw {
		const currPath = this.$route.query.path || "";

		return this.$router.resolve({
			query: {
				path: currPath + "/" + this.fileName
			}
		});
	}

	getFileExtension(): string | undefined {
		const fname = this.fileName;
		const dotIndex = fname.lastIndexOf(".");
		if (dotIndex === -1) return undefined;

		return fname.substring(dotIndex + 1, fname.length);
	}

	getIcon(): string {
		if (this.isHidden)
			return this.isDirectory ? "FolderHidden" : "FileHidden";

		if (this.isDirectory) {
			return "FolderOutline";
		}

		const ext = this.getFileExtension();
		if (!isUndefined(ext)) {
			if (["jpg", "jpeg", "png", "gif"].includes(ext))
				return "FileImageOutline";

			if (ext === "json") return "FileCodeOutline";
			if (ext === "txt") return "FileDocumentOutline";
		}

		return "FileOutline";
	}

	toHumanReadableSize(): string {
		return this.isDirectory ? "" : filesize(this.size);
	}
}
</script>
<style lang="scss" module>
.root {
	width: 100%;

	&:hover {
		background-color: var(--kt-background-surface-hover);
	}
}

.icon {
	color: var(--kt-content-neutral);
	padding: 4px;
	border-radius: 8px;
	margin-right: 0.8rem;
}

.name {
	align-self: center;
	font-weight: 600;
	margin-top: 0.6rem;
	flex-grow: 1;
}

.row {
	margin: 0.8rem 0;
}

.link {
	display: flex;
	flex-direction: row;
	width: 100%;
}
</style>
