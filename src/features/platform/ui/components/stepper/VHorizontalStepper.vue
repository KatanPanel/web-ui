<template>
	<div :class="$style.root" @update-step="onCurrentStepChange">
		<p>Current step: {{ currentStep }}</p>
		<ul v-if="steps.length > 0" :class="$style.steps">
			<li
				v-for="(step, index) in steps"
				:key="index"
				@click="onCurrentStepChange(index)"
			>
				Pirocoptero @ {{ index }}
				<!--				{{ step.$props.name }}-->
			</li>
		</ul>
		<template v-for="(step, index) in steps" :key="index">
			<keep-alive>
				<component :is="activeStep" v-if="currentStep === index" />
			</keep-alive>
		</template>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-facing-decorator";

@Component({})
export default class VHorizontalStepper extends Vue {
	@Prop({ type: Number, default: 0 })
	private readonly currentStep!: number;

	private maxSteps: number = 0;
	private activeStep: any | null = null;
	private steps: any[] = [];

	created() {
		const children: any[] = this.$slots.default!();
		console.log(children);
		this.steps = children;
		this.maxSteps = children.length;
		this.activeStep = children[this.currentStep];
	}

	mounted() {
		console.log("child", this.$slots.default!());
	}

	@Watch("currentStep")
	onCurrentStepChange(newValue: number) {
		const nextIndex = Math.min(newValue, this.maxSteps);
		this.activeStep = this.steps[nextIndex];
	}
}
</script>

<style module lang="scss">
.root {
	display: flex;
	flex-direction: column;
}

.steps {
	display: flex;
	flex-direction: row;
}

.steps__step {
	flex-grow: 0;

	&::after {
		content: "";
		display: inline-block;
		padding: 0 0.8rem;
		height: 1px;
		background-color: var(--kt-background-body);
	}
}
</style>
