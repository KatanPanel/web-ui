<template>
	<Avatar
		:src="avatarUrl"
		:label="`Avatar of ${subject}`"
		:class="$style.root"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import Avatar from "@/features/platform/ui/components/Avatar.vue";

@Component({
	components: {
		Avatar
	}
})
export default class UnitAuditLogEntryListItemAvatar extends Vue {
	@Prop({ type: String, required: true })
	private readonly avatarUrl!: string;

	@Prop({ type: String, required: true })
	private readonly subject!: string;
}
</script>

<style lang="scss" module>
.root {
	width: 40px;
	height: 40px;
}
</style>
