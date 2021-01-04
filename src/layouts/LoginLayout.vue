<template>
	<main class="v--layout-login">
		<slot />
	</main>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { AppMixin } from "@/mixins/app";

@Component
export default class LoginLayout extends mixins(AppMixin) {}
</script>
<style lang="scss">
.v--layout-login {
	height: 100%;
}
</style>
