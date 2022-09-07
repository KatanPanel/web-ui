<template>
	<Modal>
		<template #title>Import blueprint</template>
		<Transition name="transition-loading-state" mode="out-in">
			<div :class="$style.loaderWrapper" v-if="isLoading">
				<LoadingState />
			</div>
			<div v-else>
				<VAlert :class="$style.alert" variant="warn">
					<template #description>
						We strongly recommend that you do not import blueprints
						from unknown sources.
					</template>
				</VAlert>
				<VForm @submit.prevent="submit">
					<VFieldSet>
						<VLabel>URL</VLabel>
						<VInput ref="input" v-model="url" :on-surface="true" />
					</VFieldSet>
				</VForm>
			</div>
		</Transition>
		<template #actions>
			<VButton
				type="submit"
				variant="primary"
				:disabled="!canButtonBeEnabled"
				@click="submit"
			>
				Continue
			</VButton>
		</template>
	</Modal>
</template>

<script lang="ts">
import Modal from "@/features/shared/ui/components/modal/Modal.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import { Component, Ref, Vue } from "vue-facing-decorator";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VAlert from "@/features/shared/ui/components/design-system/alert/VAlert.vue";
import { ComponentPublicInstance } from "vue";
import VButton from "@/features/shared/ui/components/design-system/button/VButton.vue";
import validator from "validator";
import LoadingState from "@/features/shared/ui/components/LoadingState.vue";
import blueprintsService from "@/features/blueprints/data/blueprints.service";
import logService from "@/features/shared/data/log.service";

@Component({
	components: {
		Modal,
		VForm,
		VFieldSet,
		VInput,
		VLabel,
		VAlert,
		VButton,
		LoadingState
	}
})
export default class ImportBlueprintModal extends Vue {
	@Ref()
	private readonly input!: ComponentPublicInstance;

	isLoading = false;
	url = "";

	mounted() {
		setTimeout(() => {
			this.input.$el.focus();
		}, 300);
	}

	submit() {
		if (!this.isValidInput) return;

		this.isLoading = true;

		blueprintsService
			.importBlueprint(this.url)
			.then((result) => {
				logService.debug("import result", result);
			})
			.finally(() => (this.isLoading = false));
	}

	get canButtonBeEnabled(): boolean {
		return this.isValidInput && !this.isLoading;
	}

	private get isValidInput(): boolean {
		const isBlank = validator.isEmpty(validator.trim(this.url));
		if (isBlank) return false;

		return validator.isURL(this.url);
	}
}
</script>
<style lang="scss" module>
.alert {
	margin-bottom: 1.6rem;
}

.loaderWrapper {
	position: relative;
	height: 72px;
	margin-top: 0.8rem;
}
</style>
<style lang="scss" scoped>
.transition-loading-state-enter-active,
.transition-loading-state-leave-active {
	transition: all 0.25s ease-out;
}

.transition-loading-state-enter-from {
	opacity: 0;
	transform: translateX(30px);
}

.transition-loading-state-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}
</style>
