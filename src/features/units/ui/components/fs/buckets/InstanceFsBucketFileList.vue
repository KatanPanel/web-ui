<template>Bucket {{ bucket.name }}</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { InstanceFsBucket } from "@/features/units/models/instance.model";

@Component
export default class InstanceFsBucketFileList extends Vue {
	@Inject()
	private readonly bucket!: InstanceFsBucket;
}
</script>

<style lang="scss" module></style>
