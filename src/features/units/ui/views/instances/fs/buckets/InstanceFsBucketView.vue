<template>
	<div v-if="isLoading">
		<content-loader />
	</div>
	<div v-else-if="bucket !== null">
		<!--		<PageHeader>-->
		<!--			<template #title>Bucket</template>-->
		<!--			<template #subtitle>Subtitle</template>-->
		<!--		</PageHeader>-->
		<InstanceFsBucketFileList :initial-path="$route.query.path" />
	</div>
	<div v-else>Bucket not found</div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import {
	Instance,
	InstanceFsBucket
} from "@/features/units/models/instance.model";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import EmptyState from "@/features/shared/ui/components/EmptyState.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import { computed } from "vue";
import InstanceFsBucketFileList from "@/features/units/ui/components/instances/fs/buckets/InstanceFsBucketFileList.vue";
import { ContentLoader } from "vue-content-loader";

@Component({
	components: {
		VIcon,
		EmptyState,
		PageHeader,
		VContainer,
		InstanceFsBucketFileList,
		ContentLoader
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

	bucket: InstanceFsBucket | null = null;
	isLoading = false;

	created() {
		const id = this.$route.params.bucketId as string;

		this.isLoading = true;
		instancesPresenter
			.getBucket(this.instance.id, id)
			.then((result) => (this.bucket = result))
			.finally(() => (this.isLoading = false));
	}
}
</script>
