<template>
	<transition name="v--transition-fade" mode="out-in">
		<v-container
			v-if="loading"
			class="v--flex v--flex-justify-center v--flex-column v--full-height"
		>
			<loading />
		</v-container>
		<v-container
			v-else-if="error"
			class="v--flex v--flex-justify-center v--flex-column v--full-height v--text-align-center"
		>
			<h1>
				<b>{{ $t("errors.app.title") }}</b>
			</h1>
			<p>{{ $t("errors.app.description") }}</p>
			<i18n path="errors.app.persistence" tag="p">
				<a href="https://github.com/KatanPanel/Katan/wiki/">{{
					$t("errors.app.click-here")
				}}</a>
			</i18n>
		</v-container>
		<router-view v-else />
	</transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { THEME_STORAGE_KEY } from "@/store/mutations";
import { SET_THEME } from "@/store/actions";
import { AUTH_TOKEN_KEY } from "@/store/auth";
import { AUTH_MODULE } from "@/store";
import { AUTH_VERIFY } from "@/store/auth/actions";
import VContainer from "@/components/ui/layout/VContainer.vue";
import Loading from "@/components/Loading.vue";

@Component({
	components: { Loading, VContainer },
})
export default class Panel extends Vue {
	loading = true;
	error = false;

	mounted(): void {
		const cache = this.$storage;
		if (cache.has(THEME_STORAGE_KEY))
			this.$store.dispatch(SET_THEME, cache.get(THEME_STORAGE_KEY));

		this.$http
			.get("/")
			.then(() => {
				this.error = false;
			})
			.catch(() => {
				this.error = true;
			})
			.finally(() => {
				if (!this.error && cache.has(AUTH_TOKEN_KEY))
					this.$store
						.dispatch(AUTH_MODULE.concat("/", AUTH_VERIFY), {
							token: cache.get(AUTH_TOKEN_KEY),
						})
						.finally(() => (this.loading = false));
				else this.loading = false;
			});
	}
}
</script>
