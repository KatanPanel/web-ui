<template>
	<main class="v--layout-login">
		<slot />
	</main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginLayout extends Vue {}
</script>
<style lang="scss">
.v--layout-login {
	height: 100%;
}
</style>
