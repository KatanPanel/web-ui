<template>
	<VForm :class="$style.root">
		<VFieldSet icon="Magnify">
			<VInput placeholder="Search file..." />
		</VFieldSet>
	</VForm>
</template>

<script lang="ts">
import VForm from "@/features/platform/ui/components/form/VForm.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import { Component, Vue } from "vue-facing-decorator";
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";

@Component({
	components: { VForm, VInput, VFieldSet }
})
export default class InstanceFsBucketSearch extends Vue {}
</script>

<style lang="scss" module>
.root {
	margin-top: 1.6rem;
	margin-bottom: 1.2rem;
}
</style>
