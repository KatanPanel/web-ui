<template>
	<h4>Overview {{ unit.id }}</h4>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";

@Component
export default class UnitOverviewView extends Vue {
	@Inject()
	private readonly unit!: Unit;
}
</script>

<style lang="scss" scoped></style>
