<template>
	<form class="v--form">
		<slot />
	</form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VForm extends Vue {}
</script>
<style lang="scss" scoped>
.v--form {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-content: space-around;
	align-items: stretch;
}
</style>
