<template>
	<Resource
		empty-state-icon="FileAlertOutline"
		empty-state-title="instances.fs.bucket.file.empty-state.title"
		:include-refresh-button="true"
		:reactivity-key="currentAbsolutePath"
		:resource="getResource"
		@loaded="onLoad"
	>
		<div v-if="!isOnRoot" @click="back()">Voltar</div>
		<InstanceFsBucketFileContent v-if="!file.isDirectory" />
		<InstanceFsBucketFileDirectory v-else />
	</Resource>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from "vue-facing-decorator";
import {
	Instance,
	InstanceBucket,
	InstanceFile
} from "@/features/units/api/models/instance.model";
import InstanceFsBucketFileContent from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileContent.vue";
import Resource from "@/features/platform/ui/components/Resource.vue";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import { computed } from "vue";
import InstanceFsBucketFileDirectory from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileDirectory.vue";
import logService from "@/features/platform/api/log.service";
import { isUndefined } from "@/utils";

const ROOT = "/";

@Component({
	components: {
		InstanceFsBucketFileContent,
		InstanceFsBucketFileDirectory,
		Resource
	},
	provide(this: InstanceFsBucketFile) {
		return {
			file: computed(() => this.file)
		};
	}
})
export default class InstanceFsBucketFile extends Vue {
	@Inject() private readonly instance!: Instance;
	@Inject() private readonly bucket!: InstanceBucket;

	path: string | null = null;

	// file can change we cast it to null so Vue will make it reactive
	file: InstanceFile | null = null;

	getResource(): Promise<InstanceFile> {
		return instancesPresenter.getFile(
			this.instance.id,
			this.bucket.name,
			this.currentAbsolutePath
		);
	}

	onLoad(file: InstanceFile): void {
		this.file = file;
	}

	get currentAbsolutePath(): string {
		return this.path || (this.$route.query.path as string) || ROOT;
	}

	get isOnRoot(): boolean {
		const path = this.currentAbsolutePath;
		return path.length === 0 || path === ROOT;
	}

	back() {
		const path = this.currentAbsolutePath;
		const lastSlash = path.lastIndexOf(ROOT);
		if (lastSlash === -1) return;

		const fixedPath = path.substring(0, lastSlash);
		const isOnRoot = fixedPath.length === 0 || fixedPath === ROOT;

		// empty object will remove `?path=""` from url
		const target = this.$router.resolve(
			isOnRoot
				? {}
				: {
						query: {
							path: fixedPath
						}
				  }
		);
		this.$router.push(target);
	}

	/** Back press handling **/
	@Watch("$route.query.path", { deep: true })
	private onRouteQueryPathChange(newValue: string | undefined) {
		this.path = isUndefined(newValue) ? null : newValue;
		logService.debug("Route query path changed", newValue);
	}
}
</script>

<style lang="scss" module></style>
