<template>
	<h4>Overview {{ unit.id }}</h4>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";
import unitsPresenter from "@/features/units/ui/units.presenter";

@Component
export default class UnitOverviewView extends Vue {
	get unit(): Unit {
		return unitsPresenter.getCurrentUnitOrThrow;
	}
}
</script>

<style lang="scss" scoped></style>
