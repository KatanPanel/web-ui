<template><InstanceConsole /></template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import InstanceConsole from "@/features/units/ui/components/instances/console/InstanceConsole.vue";

@Component({
	components: { InstanceConsole }
})
export default class InstanceConsoleView extends Vue {}
</script>

<style lang="scss" scoped></style>
