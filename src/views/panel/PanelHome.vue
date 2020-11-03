<template>
	<v-container class="panel-home">
		<div class="presentation">
			<h1>
				<b>Welcome back, {{ getAccount.username }}!</b>
			</h1>
		</div>
		<div class="content">
			<ul class="tabs">
				<li><a href="#">Server List</a></li>
			</ul>
		</div>
	</v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import { mixins } from "vue-class-component";
import { AuthMixin } from "@/mixins/auth";

@Component({
	components: { VContainer },
})
export default class PanelHome extends mixins(AuthMixin) {}
</script>
<style lang="scss" scoped>
.panel-home {
	margin-top: 5%;
}
</style>
