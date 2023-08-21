<template>
	<Resource
		empty-state-icon="FolderOffOutline"
		empty-state-title="instances.fs.bucket.directory.empty-state.title"
		:resource="getResource"
		@loaded="onLoad"
	>
		<InstanceFsBucketFileList :files="children" />
	</Resource>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import {
	InstanceDirectory,
	InstanceFile
} from "@/features/units/api/models/instance.model";
import Resource from "@/features/platform/ui/components/Resource.vue";
import InstanceFsBucketFileList from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileList.vue";

@Component({
	components: { Resource, InstanceFsBucketFileList }
})
export default class InstanceFsBucketFileDirectory extends Vue {
	@Inject() private readonly file!: InstanceFile;

	children!: InstanceFile[];

	getResource(): Promise<InstanceFile[]> {
		return new Promise((resolve) =>
			resolve((this.file as InstanceDirectory).children)
		);
	}

	onLoad(children: InstanceFile[]): void {
		this.children = children;
	}
}
</script>

<style lang="scss" module></style>
