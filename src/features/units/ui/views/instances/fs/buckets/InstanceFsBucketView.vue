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
	InstanceFsBucket
} from "@/features/units/models/instance.model";
import { computed } from "vue";
import Resource from "@/features/shared/ui/components/Resource.vue";
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

	bucket!: InstanceFsBucket;

	getResource(): Promise<InstanceFsBucket> {
		return instancesPresenter.getBucket(
			this.instance.id,
			this.$route.params.bucketId as string
		);
	}

	onLoad(bucket: InstanceFsBucket): void {
		this.bucket = bucket;
	}
}
</script>
