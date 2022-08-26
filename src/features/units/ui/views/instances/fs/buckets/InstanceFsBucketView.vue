<template>
	<PageHeader>
		<template #title>Bucket</template>
		<template #subtitle>
			{{ bucketId }}
		</template>
	</PageHeader>
	<div v-if="files">
		<EmptyState
			v-if="files.length === 0"
			:align-y="true"
			icon="FolderOffOutline"
		>
			<h4>Nothing here</h4>
		</EmptyState>
		<div v-else>
			<span @click="back()">Voltar</span>
			<ul>
				<li v-for="file in files" :key="file.name">
					<router-link :to="getPathRoute(file.name)">
						<VIcon
							:name="file['is-directory'] ? 'Folder' : 'File'"
						/>
						{{ file.name }}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
	<div v-else>Loading :)</div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import { Instance } from "@/features/units/models/instance.model";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import EmptyState from "@/features/shared/ui/components/EmptyState.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import { RouteLocationRaw } from "vue-router";
import { watch } from "vue";

@Component({
	components: { VIcon, EmptyState, PageHeader, VContainer }
})
export default class InstanceFsBucketView extends Vue {
	@Inject()
	private readonly instance!: Instance;

	files: unknown[] | null = null;

	back() {
		const path = this.path;
		const lastSlash = path.lastIndexOf("/");
		if (lastSlash === -1) return;

		const fixedPath = path.substring(0, lastSlash);
		console.log("from path", path);
		console.log("to path", fixedPath);
		this.$router.push(
			this.$router.resolve({
				query: {
					path: fixedPath
				}
			})
		);
	}

	getPathRoute(path: string): RouteLocationRaw {
		return this.$router.resolve({
			query: {
				path: this.path + "/" + path
			}
		});
	}

	created() {
		watch(
			() => this.$route.query.path,
			(newValue, oldValue) => {
				console.log("route changed", oldValue, newValue);
				this.loadFiles(newValue as string);
			},
			{
				deep: true
			}
		);
		this.loadFiles(this.path);
	}

	loadFiles(path: string) {
		instancesPresenter
			.getBucketFiles(this.instance.id, this.bucketId, path)
			.then((files) => {
				this.files = (files as any[]).sort(
					(x: any, y: any) => y["is-directory"] - x["is-directory"]
				);
			});
	}

	get bucketId(): string {
		return this.$route.params.bucketId as string;
	}

	get path(): string {
		return (this.$route.query.path ?? "") as string;
	}
}
</script>

<style lang="scss" scoped></style>
