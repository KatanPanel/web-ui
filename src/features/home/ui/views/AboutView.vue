<template>
	<h3>About</h3>
	<VCard class="info">
		<div class="icon">
			<AboutInfoUpdateState state="ok" />
		</div>
		<div class="details">
			<div class="name">
				<VSubtitle2> {{ appName }} Official Compilation </VSubtitle2>
			</div>
			<div class="version">
				<VBody2>{{ version }}</VBody2>
			</div>
		</div>
	</VCard>
	<div class="update-checking">
		<VSubtitle1>Update Checking</VSubtitle1>
		<VSelectableCard class="card">
			<template #title> Você é um negão de tirar o chapeu </template>
			<template #description>
				Ainda não me chame de bb, ainda não me chame de bb, pq era assim
				que ela me chamava
			</template>
		</VSelectableCard>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import configService from "@/features/platform/api/config.service";
import TheLogo from "@/features/platform/ui/components/TheLogo.vue";
import VSubtitle2 from "@/features/platform/ui/components/typography/VSubtitle2.vue";
import VSubtitle1 from "@/features/platform/ui/components/typography/VSubtitle1.vue";
import VIcon from "@/features/platform/ui/components/icon/VIcon.vue";
import AboutInfoUpdateState from "@/features/home/ui/components/about/AboutInfoUpdateState.vue";
import VBody2 from "@/features/platform/ui/components/typography/VBody2.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import VSelectableCard from "@/features/platform/ui/components/card/VSelectableCard.vue";

@Component({
	components: {
		VSelectableCard,
		VCard,
		VBody2,
		AboutInfoUpdateState,
		VIcon,
		VSubtitle1,
		VSubtitle2,
		TheLogo
	}
})
export default class AboutView extends Vue {
	readonly appName = configService.appName;
	readonly version = configService.toVersionInfoString();
}
</script>
<style lang="scss" scoped>
.info {
	margin-top: 1.2rem;
}

.details {
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	justify-content: center;
	line-height: 1.1;
	user-select: none;
	margin-left: 1.6rem;

	.name {
		font-weight: 600;
	}

	.version {
		color: var(--kt-content-neutral);
	}
}

.update-checking {
	margin-top: 4.8rem;

	.card {
		margin-top: 1.6rem;
	}
}
</style>
