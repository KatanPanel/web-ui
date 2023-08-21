<template>
	<!--	<div :class="$style.top">-->
	<!--		<div :class="$style.arrows">-->
	<!--			<a href="#" :class="$style.arrow">-->
	<!--				<VIcon name="ArrowLeft" />-->
	<!--			</a>-->
	<!--			<a href="#" :class="$style.arrow">-->
	<!--				<VIcon name="ArrowRight" />-->
	<!--			</a>-->
	<!--		</div>-->
	<!--		<div :class="$style.search">-->
	<!--			<div :class="$style.search__icon">-->
	<!--				<VIcon name="Magnify" :on-surface="true" />-->
	<!--			</div>-->
	<!--			<VForm>-->
	<!--				<VInput :class="$style.search__input" />-->
	<!--			</VForm>-->
	<!--		</div>-->
	<!--	</div>-->
	<div :class="$style.root">
		<router-view />
		<InstanceFsUploadFile />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import InstanceFsUploadFile from "@/features/units/ui/components/instances/fs/InstanceFsUploadFile.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VForm from "@/features/platform/ui/components/form/VForm.vue";
import VContainer from "@/features/platform/ui/components/grid/VContainer.vue";
import VIcon from "@/features/platform/ui/components/icon/VIcon.vue";
import PageHeader from "@/features/platform/ui/components/PageHeader.vue";
import VButton from "@/features/platform/ui/components/button/VButton.vue";

@Component({
	components: {
		VForm,
		VInput,
		VContainer,
		VIcon,
		VButton,
		InstanceFsUploadFile
	}
})
export default class InstanceFsView extends Vue {}
</script>
<style lang="scss" module>
.root {
	padding-right: 2.4rem;
}

.top {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.search {
	background-color: var(--kt-background-surface-high);
	border-radius: 8px;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
}

.search__icon {
	margin: 0 0.8rem;
}

.search__input {
	background-color: transparent;
	flex-grow: 1;
}

.arrows {
}

.arrow {
}
</style>
