import "@/assets/styles/main.scss";
import { createApp } from "vue";
import App from "@/presentation/views/App.vue";
import "./registerServiceWorker";
import appStore from "@/native/store/app.store";
import appRouter from "@/native/routes/app.router";
import { setupI18n } from "@/i18n";
import { getModule } from "vuex-module-decorators";
import UserStore from "@/native/store/user/user.store";
import { ComponentCustomProperties } from "@vue/runtime-core";
import VueHead from "vue-head";

export const i18n = setupI18n({
	legacy: true,
	allowComposition: true,
	messages: {
		"en-US": require(/* webpackChunkName: "locale-[request]" */
		"@/lang/en-US.json").default
	}
});

const app = createApp(App).use(appStore).use(appRouter).use(VueHead).use(i18n);

// assigned all declared augmented types from shims-vue.d.ts
Object.assign(app.config.globalProperties, {
	$isDevelopmentMode: process.env.NODE_ENV !== "production",
	$katan: {
		getUser: () => getModule(UserStore).getUser
	}
} as ComponentCustomProperties);

app.mount("#app");
