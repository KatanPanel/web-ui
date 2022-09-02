<template>
	<EmptyState :align-y="true" icon="FolderOffOutline">
		<h5 v-t="'instances.fs.empty-folder'" />
	</EmptyState>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import EmptyState from "@/features/shared/ui/components/EmptyState.vue";

@Component({
	components: {
		EmptyState
	}
})
export default class InstanceFsBucketFileListEmpty extends Vue {}
</script>
