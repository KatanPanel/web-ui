<template>
	<LoadingState v-if="isLoading" key="loading" />
	<EmptyState
		v-else-if="isEmpty"
		key="empty"
		:icon="emptyStateIcon"
		:align-y="emptyStateAlignY"
	>
		<h5 v-if="emptyStateTitle" v-t="emptyStateTitle" />
		<p v-if="emptyStateDescription" v-t="emptyStateDescription" />
		<div
			v-if="$slots.empty || includeRefreshButton"
			:class="$style.empty__body"
		>
			<VButton
				v-t="'empty-state.refresh'"
				:class="$style.button"
				@click="refresh()"
			/>
			<slot name="empty" />
		</div>
	</EmptyState>
	<ErrorState v-else-if="error" key="error" />
	<template v-else>
		<slot />
	</template>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-facing-decorator";
import ErrorState from "@/features/platform/ui/components/ErrorState.vue";
import EmptyState from "@/features/platform/ui/components/EmptyState.vue";
import LoadingState from "@/features/platform/ui/components/LoadingState.vue";
import { isUndefined } from "@/utils";
import logService from "@/features/platform/api/log.service";
import VButton from "@/features/platform/ui/components/button/VButton.vue";
import { HttpError } from "@/features/platform/api/error.model";

const LOADED_EVENT = "loaded";
const ERROR_EVENT = "error";

@Component({
	components: { LoadingState, EmptyState, ErrorState, VButton },
	emits: [LOADED_EVENT, ERROR_EVENT]
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

	@Prop({ type: Boolean, default: false })
	readonly emptyStateAlignY!: boolean;

	@Prop({ type: Function })
	readonly emptyEval!: (resource: unknown) => boolean;

	@Prop({ type: Boolean, default: false })
	readonly includeRefreshButton!: boolean;

	@Prop({ type: String })
	readonly reactivityKey!: string | null;

	isLoading = true;
	isEmpty = false;
	error!: unknown;

	created() {
		this.load();
	}

	private load() {
		this.resource()
			.then(this.onDataLoaded)
			.catch(this.onError)
			.finally(() => (this.isLoading = false));
	}

	refresh() {
		this.reset();
		this.load();
	}

	private reset() {
		this.isLoading = true;
		this.isEmpty = false;
		this.error = undefined;
	}

	@Emit(LOADED_EVENT)
	onDataLoaded(value: unknown | undefined): unknown {
		if (isUndefined(this.emptyEval)) {
			// services return "undefined" to some "Unknown entity" http errors
			// so we need to threat undefined values as empty
			this.isEmpty = isUndefined(value);

			if (value instanceof Array)
				this.isEmpty = (value as []).length === 0;
		} else {
			this.isEmpty = this.emptyEval(value);
		}

		return value;
	}

	@Emit(ERROR_EVENT)
	onError(error: Error): Error | undefined {
		if (
			error instanceof HttpError &&
			(error as HttpError).message.includes("Unknown")
		) {
			this.isEmpty = true;
			return undefined;
		}

		logService.error("Failed to load resource.", error);
		this.error = error;
		return error;
	}

	@Watch("reactivityKey", {
		immediate: true
	})
	onStateChange(newValue: string | undefined): void {
		if (isUndefined(newValue)) return;

		logService.debug(
			`Update resource state, refreshing... (is loading: ${this.isLoading})`,
			newValue
		);
		if (this.isLoading) return;
		this.refresh();
	}
}
</script>
<style lang="scss" module>
.empty__body {
	margin-top: 1.6rem;
}

.button:not(:last-child) {
	margin-right: 0.8rem;
}
</style>
