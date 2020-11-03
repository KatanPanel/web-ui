<template>
	<div class="v--navbar">
		<v-container class="v--flex">
			<slot />
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";

@Component({
	components: { VContainer },
})
export default class VNavbar extends Vue {}
</script>
