import { App } from "vue";
import VueHead from "vue-head";
import VueLoading from "vue-loading-overlay";
import { vfmPlugin } from "vue-final-modal";
import VueProgressiveImage from "vue-progressive-image";
import vueCodemirror from "./vue-codemirror";
import vueEcharts from "./vue-echarts";
import vueI18n from "./vue-i18n";
import "./dayjs";

export function installPlugins(app: App) {
	app.use(VueHead)
		.use(VueLoading)
		.use(vfmPlugin)
		.use(VueProgressiveImage);

	const plugins = [vueCodemirror, vueEcharts, vueI18n];

	for (const plugin of plugins) {
		plugin(app)
	}
}
