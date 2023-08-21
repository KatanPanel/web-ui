<template>
	<VRow :class="$style.root">
		<VCol :size="4">
			<router-link :to="getRoute()" :class="$style.link">
				<VIcon :name="getIcon()" :class="$style.icon" />
				<span :class="$style.name">{{ fileName }}</span>
			</router-link>
		</VCol>
		<VCol :size="2" v-text="toHumanReadableSize()"/>
		<VCol :size="3" v-text="formatDateTime(lastModified)" />
		<VCol :size="3" v-text="formatDateTime(createdAt)"/>
	</VRow>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-facing-decorator";
import { InstanceBucket } from "@/features/units/api/models/instance.model";
import filesize from "filesize";
import VIcon from "@/features/platform/ui/components/icon/VIcon.vue";
import { isUndefined } from "@/utils";
import { RouteLocationRaw } from "vue-router";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import dayjs from "dayjs";

@Component({
	components: { VIcon, VRow, VCol }
})
export default class InstanceFsBucketFileListItem extends Vue {
	@Inject() readonly bucket!: InstanceBucket;

	@Prop({ type: Number, required: true }) readonly index!: number;
	@Prop({ type: String, required: true }) readonly fileName!: string;
	@Prop({ type: Number, required: true }) readonly size!: number;
	@Prop({ type: Boolean, required: true }) readonly isHidden!: boolean;
	@Prop({ type: Boolean, required: true }) readonly isDirectory!: boolean;
	@Prop({ type: Date, required: true }) readonly lastModified!: Date | undefined;
	@Prop({ type: Date, required: true }) readonly createdAt!: Date | undefined;

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

	formatDateTime(date: Date | undefined): string {
		return isUndefined(date) ? "" : dayjs(date).format("LLLL")
	}

}
</script>
<style lang="scss" module>
.root {
	width: 100%;
	margin: 0 -2rem;
	padding: 0 2rem;

	&:hover {
		background-color: var(--kt-background-surface-hover);
	}
}

.icon {
	color: var(--kt-content-neutral);
	padding: 4px 0;
	border-radius: 8px;
	margin-right: 0.8rem;
}

.name {
	align-self: center;
	font-weight: 400;
	margin-top: 0.6rem;
	flex-grow: 1;
	color: var(--kt-content-neutral);
}

.row {
	margin: 0.8rem 0;
}

.link {
	display: flex;
	flex-direction: row;
	width: 100%;
	text-decoration: none;
}
</style>
