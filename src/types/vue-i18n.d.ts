import { I18n } from "@/i18n";
declare module "vue-i18n" {
	interface VueI18n {
		i18n: I18n;
	}
}
