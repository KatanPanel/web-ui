<template>Advanced</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";

@Component
export default class UnitSettingsAdvancedTab extends Vue {
	@Inject()
	private readonly unit!: Unit;
}
</script>

<style lang="scss" module>
.form {
}
</style>
