<template>
	<Resource :resource="getResource" @loaded="onResourceLoaded">
		Buckets
		<ul>
			<li v-for="mount in instance.runtime.mounts" :key="mount.id">
				<router-link :to="createRouteToBucket(mount.id)">
					{{ mount.id }}
				</router-link>
			</li>
		</ul>
	</Resource>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import {
	Instance,
	InstanceMount
} from "@/features/units/api/models/instance.model";
import { RouteLocationRaw } from "vue-router";
import { INSTANCE_FS_BUCKET_ROUTE } from "@/features/units/units.routes";
import Resource from "@/features/platform/ui/components/Resource.vue";

@Component({
	components: { Resource }
})
export default class InstanceFsBucketListView extends Vue {
	@Inject()
	private readonly instance!: Instance;

	mounts!: InstanceMount[];

	createRouteToBucket(id: string): RouteLocationRaw {
		return {
			name: INSTANCE_FS_BUCKET_ROUTE,
			params: {
				bucketId: id
			}
		};
	}

	getResource(): Promise<InstanceMount[]> {
		return new Promise((resolve) => resolve(this.instance.runtime!.mounts));
	}

	onResourceLoaded(mounts: InstanceMount[]): void {
		this.mounts = mounts;

		if (mounts.length === 1) {
			this.$router.push(this.createRouteToBucket(mounts[0].id));
			return;
		}
	}
}
</script>
