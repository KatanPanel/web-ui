<template>
	<router-view />
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class InstanceView extends Vue {
	beforeRouteEnter() {
		console.log("before route enter instance view");
	}
}
</script>
