import "@/registerServiceWorker";
import "@/assets/styles/main.scss";
import App from "@/createApp";

const app = App;
app.config.unwrapInjectedRef = true;

// assigned all declared augmented from types/shims-vue.d.ts
Object.assign(app.config.globalProperties, {
	$isDevelopmentMode: process.env.NODE_ENV !== "production"
});

app.mount("#app");
