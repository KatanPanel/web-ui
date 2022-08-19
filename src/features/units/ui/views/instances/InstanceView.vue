<template>
	<router-view v-if="instance" />
	<div v-else>Laoding</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import { Instance } from "@/features/units/models/instance.model";
import { computed } from "vue";

@Component({
	provide(this: InstanceView) {
		return {
			instance: computed(() => this.instance)
		};
	}
})
export default class InstanceView extends Vue {
	instance: Instance | null = null;

	created() {
		const id = this.$route.params.instanceId as string;
		instancesPresenter.getInstance(id).then((result) => {
			this.instance = result;
		});
	}
}
</script>
