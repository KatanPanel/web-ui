<template>
	Buckets
	<ul>
		<li v-for="mount in instance.runtime.mounts" :key="mount.id">
			<router-link :to="getBucketRoute(mount.id)">{{
				mount.id
			}}</router-link>
		</li>
	</ul>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Instance } from "@/features/units/models/instance.model";
import { RouteLocationRaw } from "vue-router";
import { INSTANCE_FS_BUCKET_ROUTE } from "@/features/units/routing/units.routes";

@Component
export default class InstanceFsBucketListView extends Vue {
	@Inject()
	private readonly instance!: Instance;

	getBucketRoute(id: string): RouteLocationRaw {
		return {
			name: INSTANCE_FS_BUCKET_ROUTE,
			params: {
				bucketId: id
			}
		};
	}
}
</script>
