<template>
	<VContainer>
		<PageHeader>
			<template #title> Users </template>
			<template #subtitle>
				Users have strictly defined permissions and roles that can be
				changed here. You can only change users with roles below yours
				or with unassigned roles and unit-specific permissions are on
				the units settings page for the respective units.
			</template>
		</PageHeader>
	</VContainer>
</template>

<script lang="ts">
import VContainer from "@/design-system/grid/VContainer.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import { Component, Vue } from "vue-facing-decorator";

@Component({
	components: { PageHeader, VContainer }
})
export default class UsersView extends Vue {}
</script>

<style lang="scss" scoped></style>
