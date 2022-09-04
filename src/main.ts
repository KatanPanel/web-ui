import "@/registerServiceWorker";
import "@/assets/styles/main.scss";
import { createApp } from "vue";
import { setupI18n } from "@/i18n";
import { ComponentCustomProperties } from "@vue/runtime-core";
import App from "@/features/shared/ui/views/App.vue";
import appStore from "@/store";
import appRouter from "@/router";
import VueSimpleContextMenu from "vue-simple-context-menu";
import VueHead from "vue-head";
import VueCodeMirror from "vue-codemirror";
import { basicSetup } from "codemirror";
import VueLoading from "vue-loading-overlay";

export const i18n = setupI18n({
	legacy: true,
	allowComposition: true,
	messages: {
		"en-US": require(/* webpackChunkName: "locale-[request]" */
		"@/lang/en-US.json").default
	}
});

const app = createApp(App)
	.use(appStore)
	.use(appRouter)
	.use(VueHead)
	.use(VueCodeMirror, {
		autoFocus: true,
		indentWithTab: true,
		tabSize: 4,
		extensions: [basicSetup]
	})
	.use(VueLoading)
	.component("vue-simple-context-menu", VueSimpleContextMenu)
	.use(i18n);

app.config.unwrapInjectedRef = true;

// assigned all declared augmented types from shims-vue.d.ts
Object.assign(app.config.globalProperties, {
	$isDevelopmentMode: process.env.NODE_ENV !== "production"
} as ComponentCustomProperties);

app.mount("#app");
