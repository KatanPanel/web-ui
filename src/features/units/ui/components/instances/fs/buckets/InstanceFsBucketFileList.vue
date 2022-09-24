<template>
	<VCard>
		<VRow>
			<VCol :size="4">
				<VLabel>Name</VLabel>
			</VCol>
			<VCol :size="4">
				<VLabel>Size</VLabel>
			</VCol>
			<VCol :size="4">
				<VLabel>Last Modified</VLabel>
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
		/>
	</VCard>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { InstanceFsFile } from "@/features/units/models/instance.model";
import InstanceFsBucketFileListItem from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileListItem.vue";
import VContainer from "@/design-system/grid/VContainer.vue";
import VCol from "@/design-system/grid/VCol.vue";
import VRow from "@/design-system/grid/VRow.vue";
import VLabel from "@/design-system/form/VLabel.vue";
import VCard from "@/design-system/card/VCard.vue";

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
