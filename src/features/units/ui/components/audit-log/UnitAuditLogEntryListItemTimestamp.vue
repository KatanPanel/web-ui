<template>
	<time
		:datetime="timestamp"
		:class="$style.root"
		v-text="formatTimestamp(timestamp)"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import dayjs from "dayjs";

@Component
export default class UnitAuditLogEntryListItemTimestamp extends Vue {
	@Prop({ type: Date, required: true })
	private readonly timestamp!: Date;

	formatTimestamp(timestamp: Date): string {
		return dayjs(timestamp, "dddd") as unknown as string;
	}
}
</script>

<style lang="scss" module>
.root {
	font-size: 12px;
	color: var(--kt-content-neutral-low);
}
</style>
