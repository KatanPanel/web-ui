<template>
	<LoadingState v-if="isLoading" key="loading" />
	<EmptyState v-else-if="isEmpty" :icon="emptyStateIcon" key="empty">
		<h5 v-if="emptyStateTitle" v-t="emptyStateTitle" />
		<p v-if="emptyStateDescription" v-t="emptyStateDescription" />
	</EmptyState>
	<ErrorState v-else-if="error" key="error" />
	<template v-else>
		<slot />
	</template>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import ErrorState from "@/features/shared/ui/components/ErrorState.vue";
import EmptyState from "@/features/shared/ui/components/EmptyState.vue";
import LoadingState from "@/features/shared/ui/components/LoadingState.vue";
import { isUndefined } from "@/utils";

const LOADED_EVENT = "loaded";

@Component({
	components: { LoadingState, EmptyState, ErrorState },
	emits: [LOADED_EVENT]
})
export default class Resource extends Vue {
	@Prop({ type: Function, required: true })
	readonly resource!: () => Promise<unknown>;

	@Prop({ type: String })
	readonly emptyStateTitle!: string;

	@Prop({ type: String })
	readonly emptyStateDescription!: string;

	@Prop({ type: String })
	readonly emptyStateIcon!: string;

	@Prop({ type: Function })
	readonly emptyEval!: (resource: unknown) => boolean;

	isLoading = true;
	isEmpty = false;
	error!: unknown;

	created() {
		this.load();
	}

	private load() {
		this.reset();
		this.resource()
			.then((value) => {
				if (isUndefined(this.emptyEval)) {
					if (value instanceof Array)
						this.isEmpty = (value as []).length === 0;
				} else {
					this.isEmpty = this.emptyEval(value);
				}

				this.$emit(LOADED_EVENT, value);
			})
			.catch((error) => (this.error = error))
			.finally(() => (this.isLoading = false));
	}

	private reset() {
		this.isLoading = true;
		this.isEmpty = false;
		this.error = undefined;
	}
}
</script>

<style lang="scss" scoped></style>
