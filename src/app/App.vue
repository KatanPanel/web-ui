<template>
	<div id="app">
		<transition mode="out-in" name="v--transition-fade">
			<div v-if="loading" key="loading" class="app-loading">
				<div class="content">
					<div class="info">Inicializando aplicação...</div>
				</div>
			</div>
			<router-view v-else key="loaded" />
		</transition>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheLogo from "@/app/shared/components/TheLogo.vue";
import Loading from "@/app/shared/components/Loading.vue";

@Component<App>({
	components: { Loading, TheLogo },
	created(): void {
		this.$root.$on("loading", () => (this.loading = true));
		this.$root.$on("loaded", () => (this.loading = false));
	},
	mounted(): void {
		this.$root.$emit("init");
	}
})
export default class App extends Vue {
	loading = true;
}
</script>
<style lang="scss" src="../assets/styles/main.scss" />
<style lang="scss" scoped>
#app {
	display: flex;
	display: -ms-flexbox;
	flex-direction: column;
	height: 100%;
	transition: all 1s linear;
}

.app-loading {
	position: fixed;
	background: var(--kt-primary-color);
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	.content {
		position: fixed;
		transform: translate(-50%, -50%);
		left: 50%;
		top: 50%;
	}

	.logo {
		text-align: center;
	}

	.info {
		color: var(--kt-primary-text-color);
		font-size: 4.8rem;
		position: relative;
		font-weight: 100;
		top: 2.4rem;
	}
}
</style>
