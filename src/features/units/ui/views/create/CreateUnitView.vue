<template>
	<div :class="$style.root">
		<VContainer>
			<h2 v-t="'units.create.title'" :class="$style.title" />
			<VForm @submit.prevent="create">
				<VHorizontalStepper :current-step="currentStep">
					<VHorizontalStepperItem
						key="template"
						name="Template do cu"
					>
						<CreateUnitName
							v-model:name="form.name"
							v-model:template="form.template"
						/>
					</VHorizontalStepperItem>
					<VHorizontalStepperItem key="instance" name="Instância">
						<CreateUnitInstanceSettings />
					</VHorizontalStepperItem>
					<VButton @click="$emit('update-step', -1)">Voltar</VButton>
					<VButton @click="$emit('update-step', 1)">Avançar</VButton>
				</VHorizontalStepper>
			</VForm>
		</VContainer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VContainer from "@/features/platform/ui/components/grid/VContainer.vue";
import CreateUnitInstanceSettings from "@/features/units/ui/components/create/CreateUnitInstanceSettings.vue";
import CreateUnitName from "@/features/units/ui/components/create/CreateUnitName.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VForm from "@/features/platform/ui/components/form/VForm.vue";
import VButton from "@/features/platform/ui/components/button/VButton.vue";
import unitsService from "@/features/units/api/units.service";
import { Unit } from "@/features/units/api/models/unit.model";
import VHorizontalStepper from "@/features/platform/ui/components/stepper/VHorizontalStepper.vue";
import VHorizontalStepperItem from "@/features/platform/ui/components/stepper/VHorizontalStepperItem.vue";

@Component({
	components: {
		VHorizontalStepperItem,
		VHorizontalStepper,
		VButton,
		VForm,
		VCol,
		VContainer,
		CreateUnitName,
		CreateUnitInstanceSettings
	}
})
export default class CreateUnitView extends Vue {
	currentStep: number = 0;
	isCreating: boolean = false;

	form: {
		name: string;
		template: string;
		image: string;
		network: {
			address: string | null;
			port: number | null;
			hostname: string;
		};
	} = {
		name: "",
		template: "",
		image: "",
		network: {
			address: null,
			port: null,
			hostname: ""
		}
	};

	create() {
		if (this.form.name.length === 0 || this.form.template.length === 0)
			return;

		this.isCreating = true;
		unitsService
			.createUnit({
				name: this.form.name,
				image: this.form.image,
				blueprintId: "",
				network: {
					host: this.form.network.address,
					port: this.form.network.port
				},
				options: {}
			})
			.then((unit: Unit) => {
				console.log("Unit created", unit);
			})
			.finally(() => (this.isCreating = false));
	}
}
</script>

<style lang="scss" module>
.root {
	background-color: var(--kt-background-surface);
	height: 100%;
}

.title {
	text-align: center;
	font-weight: 700;
	user-select: none;
	margin: 3.6rem 0;
}

.mainCard {
	background-color: var(--kt-content-primary);
	color: var(--kt-content-primary-oncolor);

	label {
		color: var(--kt-content-primary-oncolor);
	}
}
</style>
