<template>
	<div class="v--input-icon">
		<v-icon :name="name" />
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";

@Component({
	components: { VIcon }
})
export default class VInputIcon extends Vue {
	@Prop({ type: String, required: true }) private readonly name!: string;
}
</script>
