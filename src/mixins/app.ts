import Vue from "vue";
import Component from "vue-class-component";
import { AppLanguage } from "@/store/state";
import { GET_LANGUAGE, GET_THEME } from "@/store/getters";
import { loadLanguage } from "@/i18n";
import { SWITCH_THEME } from "@/store/actions";

@Component
export class AppMixin extends Vue {
	public get currentLanguage(): AppLanguage {
		return this.$store.getters[GET_LANGUAGE];
	}

	public set currentLanguage(language: AppLanguage) {
		loadLanguage(language.tag).then();
	}

	public get getSupportedLanguages(): Array<AppLanguage> {
		return require("@/assets/lang/supported-languages").default.filter(
			(value: AppLanguage) => value !== this.currentLanguage
		);
	}

	get currentTheme(): string {
		return this.$store.getters[GET_THEME];
	}

	private switchTheme(): void {
		this.$store.dispatch(SWITCH_THEME);
	}
}
