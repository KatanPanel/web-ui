<template>
	<main class="v--layout-login">
		<slot />
	</main>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import VNavbar from "@/components/ui/navbar/VNavbar.vue";
import VNavbarContent from "@/components/ui/navbar/VNavbarContent.vue";
import VDropdown from "@/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/components/ui/dropdown/VDropdownItem.vue";
import { mixins } from "vue-class-component";
import { AppMixin } from "@/mixins/app";

@Component({
	components: { VDropdownItem, VDropdown, VNavbarContent, VNavbar },
})
export default class LoginLayout extends mixins(AppMixin) {}
</script>
