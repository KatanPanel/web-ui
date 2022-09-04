<template>
	<VAlert v-show="isVisible()" variant="error">
		<template #description>
			<span v-t="'instances.network.assignment-failed'" />
		</template>
	</VAlert>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import VAlert from "@/features/shared/ui/components/design-system/alert/VAlert.vue";
import { Instance } from "@/features/units/models/instance.model";

@Component({
	components: { VAlert }
})
export default class InstanceNetworkAssignmentFailedAlert extends Vue {
	@Inject()
	private readonly instance!: Instance;

	isVisible(): boolean {
		return this.instance.status === "network-assignment-failed";
	}
}
</script>

<style lang="scss" scoped></style>
