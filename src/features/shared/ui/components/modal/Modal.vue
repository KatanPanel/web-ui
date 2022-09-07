<template>
	<vue-final-modal
		v-slot="{ params, close }"
		v-bind="$attrs"
		classes="modal-container"
		content-class="modal-content"
	>
		<span class="modal__title">
			<slot name="title" />
		</span>
		<div class="modal__content">
			<slot :params="params" />
		</div>
		<div class="modal__action" v-show="$slots.actions">
			<slot name="actions" />
		</div>
		<button class="modal__close" @click="close">
			<VIcon name="Close" />
		</button>
	</vue-final-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";

@Component({
	inheritAttrs: false,
	emits: ["confirm", "cancel"],
	components: { VIcon }
})
export default class BaseModal extends Vue {}
</script>

<style lang="scss" scoped>
::v-deep(.modal-container) {
	display: flex;
	justify-content: center;
	align-items: center;
}
::v-deep(.modal-content) {
	position: relative;
	display: flex;
	flex-direction: column;
	max-height: 90%;
	margin: 0 1.6rem;
	border-radius: 8px;
	background: var(--kt-background-surface);
	width: 480px;
}
.modal__title {
	font-family: var(--kt-headline-font);
	font-size: 20px;
	font-weight: 700;
	user-select: none;
	padding: 1.6rem 1.6rem 0;
}
.modal__action {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-shrink: 0;
	border-top: 1px solid var(--kt-border-low);
	padding: 1.6rem;
	margin-top: 0.8rem;
	//margin: 1.6rem -1.6rem 0;
}
.modal__content {
	flex-grow: 1;
	overflow-y: auto;
	overflow-x: hidden;
	margin: 1.6rem 0;
	padding: 0 1.6rem;
	max-height: 480px;
}
.modal__close {
	position: absolute;
	top: 1.6rem;
	right: 1.6rem;
	background-color: transparent;
	color: var(--kt-content-neutral-low);

	&:hover {
		color: var(--kt-content-neutral-high);
		cursor: pointer;
	}
}
</style>
