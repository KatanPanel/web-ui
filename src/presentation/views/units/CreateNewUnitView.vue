<template>
	<HomeLayout>
		<div :class="$style.root">
			<h4 :class="$style.title">Create new unit</h4>
			<VForm>
				<VFieldSet>
					<VLabel>name</VLabel>
					<VInput />
				</VFieldSet>
				<VFieldSet>
					<VLabel>IP Address</VLabel>
					<VInput />
				</VFieldSet>
			</VForm>
		</div>
	</HomeLayout>
</template>
<script>
import { Component, Vue } from "vue-facing-decorator";
import VForm from "@/presentation/components/ui/form/VForm";
import VFieldSet from "@/presentation/components/ui/form/VFieldSet";
import VInput from "@/presentation/components/ui/form/VInput";
import VLabel from "@/presentation/components/ui/form/VLabel";
import HomeLayout from "@/presentation/layouts/home/HomeLayout";

@Component({
	components: { HomeLayout, VLabel, VInput, VFieldSet, VForm }
})
export default class CreateNewUnitView extends Vue {}
</script>
<style lang="scss" module>
.root {
	margin: auto;
}

.title {
	margin-bottom: 2.4rem;
}
</style>
