<template>
	<ul>
		<li v-router-href="{ name: HOME_ROUTE }">
			<a v-t="'header.home'" />
		</li>
		<li>
			<a v-t="'header.docs'" href="https://github.com/KatanPanel/Katan" />
		</li>
		<li>
			<a
				v-t="'header.support'"
				href="https://github.com/KatanPanel/Katan/issues"
			/>
		</li>
		<li>
			<a v-t="'header.community'" href="https://discord.gg/ey8dwsv" />
		</li>
		<li>
			<a
				v-t="'header.api'"
				href="https://github.com/KatanPanel/Katan/wiki"
			/>
		</li>
	</ul>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HOME_ROUTE } from "@/router";

@Component
export default class TheNavbarItems extends Vue {
	private readonly HOME_ROUTE = HOME_ROUTE;
}
</script>
