<template>
	<VAlert variant="error" :class="$style.root">
		<template #description>
			<span v-t="'instances.network.assignment-failed'" />
		</template>
	</VAlert>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VAlert from "@/features/platform/ui/components/alert/VAlert.vue";

@Component({
	components: { VAlert }
})
export default class InstanceNetworkAssignmentFailedAlert extends Vue {}
</script>
<style lang="scss" module>
.root {
	margin-bottom: 2.4rem;
}
</style>
