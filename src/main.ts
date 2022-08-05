import "@/assets/styles/main.scss";
import { createApp } from "vue";
import App from "@/presentation/views/App.vue";
import "./registerServiceWorker";
import appStore from "@/native/store/app.store";
import appRouter from "@/native/routes/app.router";
import { setupI18n } from "@/native/i18n";
import en from "@/lang/en.json";

export const i18n = setupI18n({
	legacy: true,
	allowComposition: true,
	messages: {
		en
	}
});

const app = createApp(App).use(appStore).use(appRouter).use(i18n);

app.mount("#app");
