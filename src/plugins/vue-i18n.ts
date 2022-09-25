import { App } from "vue";
import { setupI18n } from "@/i18n";

export const i18n = setupI18n({
	legacy: true,
	allowComposition: true,
	messages: {
		"en-US": require(/* webpackChunkName: "locale-[request]" */"@/lang/en-US.json").default
	}
});

const install = (app: App) => {
	app.use(i18n)
};

export default install
