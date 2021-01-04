<template>
	<div class="panel-fs">FS</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import WindowMixin from "@/mixins/window";

@Component<ServerFS>({
	activated(): void {
		this.updateWindowTitle("Gerenciador de Arquivos");
	},
})
export default class ServerFS extends mixins(WindowMixin) {}
</script>
