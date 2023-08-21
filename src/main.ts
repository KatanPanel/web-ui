import "@/registerServiceWorker";
import "@/assets/styles/main.scss";
import { createApp } from "vue";
import App from "@/App.vue";
import appStore from "@/store";
import appRouter from "@/router";
import { installPlugins } from "@/plugins";

const app = createApp(App)
	.use(appStore)
	.use(appRouter)
app.config.unwrapInjectedRef = true

// assigned all declared augmented types from shims-vue.d.ts
Object.assign(app.config.globalProperties, {
	$isDevelopmentMode: process.env.NODE_ENV !== "production"
});

installPlugins(app)

app.mount("#app");
