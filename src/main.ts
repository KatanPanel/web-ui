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
import VueProgressiveImage from "vue-progressive-image";
import VueFinalModal from "vue-final-modal";

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent
} from "echarts/components";
import ECharts from "vue-echarts";
import { use } from "echarts/core";

use([
	CanvasRenderer,
	LineChart,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	LegendComponent
]);

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
	.use(VueProgressiveImage)
	.use(VueFinalModal)
	.use(i18n)
	.component("vue-simple-context-menu", VueSimpleContextMenu)
	.component("v-chart", ECharts);

app.config.unwrapInjectedRef = true;

// assigned all declared augmented types from shims-vue.d.ts
Object.assign(app.config.globalProperties, {
	$isDevelopmentMode: process.env.NODE_ENV !== "production"
});

app.mount("#app");
