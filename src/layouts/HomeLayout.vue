<template>
	<div class="v--layout-home">
		<the-navbar />
		<main>
			<slot />
		</main>
		<the-footer />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheFooter from "@/components/TheFooter.vue";
import TheNavbar from "@/components/TheNavbar.vue";

@Component({
	components: { TheNavbar, TheFooter },
})
export default class HomeLayout extends Vue {}
</script>
<style lang="scss">
.v--layout-home {
	background-color: var(--app-background);
	color: var(--app-text-color);
}
</style>
