<template>
	<VCard :flat="true">
		<VRow>
			<VCol :size="4">
				<VLabel v-t="'instances.fs.bucket.file-list.labels.name'"/>
			</VCol>
			<VCol :size="2">
				<VLabel v-t="'instances.fs.bucket.file-list.labels.size'"/>
			</VCol>
			<VCol :size="3">
				<VLabel v-t="'instances.fs.bucket.file-list.labels.modified'"/>
			</VCol>
			<VCol :size="3">
				<VLabel v-t="'instances.fs.bucket.file-list.labels.created'"/>
			</VCol>
		</VRow>
		<InstanceFsBucketFileListItem
			v-for="(file, idx) in getFiles"
			:index="idx"
			:key="file.absolutePath"
			:file-name="file.name"
			:is-directory="file.isDirectory"
			:is-hidden="file.isHidden"
			:size="file.size"
			:last-modified="file.modifiedAt"
			:created-at="file.createdAt"
		/>
	</VCard>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { InstanceFsFile } from "@/features/units/api/models/instance.model";
import InstanceFsBucketFileListItem
	from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileListItem.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";

@Component({
	components: {
		VRow,
		VCard,
		VCol,
		VLabel,
		InstanceFsBucketFileListItem
	}
})
export default class InstanceFsBucketFileList extends Vue {
	@Prop({ type: Array, required: true })
	private readonly files!: InstanceFsFile[];

	private _files!: InstanceFsFile[];

	created(): void {
		this._files = this.files;
	}

	beforeMount(): void {
		this.sortFiles(this._files);
	}

	get getFiles(): InstanceFsFile[] {
		return this._files;
	}

	/**
	 * Sorts a file list, moves all directories to top.
	 *
	 * @param files The file list.
	 * @private
	 */
	private sortFiles(files: InstanceFsFile[]) {
		files.sort(
			(a: InstanceFsFile, b: InstanceFsFile) =>
				(b.isDirectory ? 1 : 0) - (a.isDirectory ? 1 : 0)
		);
	}
}
</script>
