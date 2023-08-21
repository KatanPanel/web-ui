<template>
	<Resource
		empty-state-icon="PailOffOutline"
		empty-state-title="instances.fs.bucket.empty-state.title"
		:resource="getResource"
		:include-refresh-button="true"
		@loaded="onLoad"
	>
		<InstanceFsBucketSearch />
		<InstanceFsBucketFile />
	</Resource>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import {
	Instance,
	InstanceBucket
} from "@/features/units/api/models/instance.model";
import { computed } from "vue";
import Resource from "@/features/platform/ui/components/Resource.vue";
import InstanceFsBucketFile from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFile.vue";
import InstanceFsBucketSearch from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketSearch.vue";

@Component({
	components: {
		Resource,
		InstanceFsBucketFile,
		InstanceFsBucketSearch
	},
	provide(this: InstanceFsBucketView) {
		return {
			bucket: computed(() => this.bucket)
		};
	}
})
export default class InstanceFsBucketView extends Vue {
	@Inject()
	private readonly instance!: Instance;

	bucket!: InstanceBucket;

	getResource(): Promise<InstanceBucket> {
		return instancesPresenter.getBucket(
			this.instance.id,
			this.$route.params.bucketId as string
		);
	}

	onLoad(bucket: InstanceBucket): void {
		this.bucket = bucket;
	}
}
</script>
