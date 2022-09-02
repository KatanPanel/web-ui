<template>
	<span @click="back()" v-if="path.length !== 0">Voltar</span>
	<div v-if="isLoading">Loadfing :)</div>
	<InstanceFsBucketFileContent v-else-if="!isDirectory" />
	<InstanceFsBucketFileListEmpty v-else-if="isEmpty" />
	<div v-else>
		<h4>Directories</h4>
		<table :class="$style.table">
			<thead>
				<tr :class="$style.tableHeader">
					<th>Name</th>
					<th>Size</th>
					<th>Last Modified</th>
				</tr>
			</thead>
			<tbody>
				<InstanceFsBucketFileListItem
					v-for="(file, idx) in files"
					:index="idx"
					:key="file.absolutePath"
					:file-name="file.name"
					:is-directory="file.isDirectory"
					:is-hidden="file.isHidden"
					:size="file.size"
					:last-modified="file.modifiedAt"
				/>
			</tbody>
		</table>
	</div>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-facing-decorator";
import {
	Instance,
	InstanceFsBucket,
	InstanceFsDirectory,
	InstanceFsFile
} from "@/features/units/models/instance.model";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import { HttpError } from "@/features/shared/models/error.model";
import InstanceFsBucketFileListEmpty from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileListEmpty.vue";
import InstanceFsBucketFileListItem from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileListItem.vue";
import { isUndefined } from "@/utils";
import InstanceFsBucketFileContent from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileContent.vue";
import { computed } from "vue";

@Component({
	components: {
		InstanceFsBucketFileListEmpty,
		InstanceFsBucketFileContent,
		InstanceFsBucketFileListItem
	},
	provide(this: InstanceFsBucketFileList) {
		return {
			file: computed(() => this.file)
		};
	}
})
export default class InstanceFsBucketFileList extends Vue {
	@Inject()
	private readonly instance!: Instance;

	@Inject()
	private readonly bucket!: InstanceFsBucket;

	@Prop({ type: String })
	private readonly initialPath!: string;

	path = "";
	file: InstanceFsFile | null = null;
	files: InstanceFsFile[] | null = null;
	isLoading = false;
	isEmpty = false;
	isDirectory = false;
	error: HttpError | null = null;

	@Watch("$route.query.path", { deep: true })
	private onRouteQueryPathChange(newValue: string) {
		this.path = newValue;
		this.update();
	}

	created() {
		this.path = this.initialPath || "";
		this.reset();
		this.update();
	}

	back() {
		const path = this.path;
		const lastSlash = path.lastIndexOf("/");
		if (lastSlash === -1) return;

		const fixedPath = path.substring(0, lastSlash);
		this.$router.push(
			this.$router.resolve({
				query: {
					path: fixedPath
				}
			})
		);
	}

	private reset() {
		this.isEmpty = false;
		this.isDirectory = false;
		this.files = null;
	}

	private update() {
		this.isLoading = true;
		instancesPresenter
			.getFile(this.instance.id, this.bucket.name, this.path)
			.then((file) => {
				this.file = file;
				this.isDirectory = file.isDirectory;

				if (file.isDirectory) {
					const children = (file as InstanceFsDirectory).children;
					this.isEmpty = children.length === 0;
					if (!isUndefined(children)) this.sortFiles(children);

					this.files = children;
				}
			})
			.finally(() => (this.isLoading = false));
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
<style lang="scss" module>
.table {
	width: 100%;
}

.tableHeader {
	text-align: left;
}
</style>
