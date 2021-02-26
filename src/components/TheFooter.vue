<template>
	<footer class="v--footer">
		<v-container>
			<p
				v-t="{
					path: 'footer.client-version',
					args: { version: currentVersion },
				}"
			/>
			<i18n path="footer.credits.icons" tag="p">
				<a
					href="https://www.flaticon.com/authors/freepik"
					title="Freepik"
					target="_blank"
					>Freepik</a
				>
				<a
					href="https://www.flaticon.com/"
					title="Flaticon"
					target="_blank"
					>www.flaticon.com</a
				>
			</i18n>
		</v-container>
	</footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";

@Component({
	components: { VContainer },
})
export default class TheFooter extends Vue {
	private readonly currentVersion = process.env.VUE_APP_VERSION;
}
</script>
<style lang="scss" scoped>
.v--footer {
	position: relative;
	margin-bottom: 8px;
	font-size: 14px;
	text-align: center;
	color: var(--kt-text-color);
	width: 100%;
	height: 48px;
	min-height: 48px;
	opacity: 0.7;
	user-select: none;

	p {
		font-size: 14px;
		margin-bottom: 4px;
	}
}
</style>
