<template>
	<h4>Error state ;)</h4>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component({
	emits: ["retry"]
})
export default class ErrorState extends Vue {}
</script>

<style lang="scss" scoped></style>
