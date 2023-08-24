import "@/registerServiceWorker";
import "@/assets/styles/main.scss";
import App from "@/createApp";

const app = App;
Object.assign(app.config.globalProperties, {
	$isDevelopmentMode: process.env.NODE_ENV !== "production"
});

app.mount("#app");
