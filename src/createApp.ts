import { default as AppRoot } from "@/App.vue";
import AppStore from "@/store";
import AppRouter from "@/router";
import ECharts from "vue-echarts";
import VueCodeMirror from "vue-codemirror";
import { basicSetup } from "codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { markdown } from "@codemirror/lang-markdown";
import { linter, lintGutter } from "@codemirror/lint";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import { color } from "@uiw/codemirror-extensions-color";
import { createApp } from "vue";
import VueHead from "vue-head";
import VueLoading from "vue-loading-overlay";
import { createVfm } from "vue-final-modal";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent
} from "echarts/components";
import VueProgressiveImage from "vue-progressive-image";
import { setupI18n } from "@/i18n";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";

use([
	CanvasRenderer,
	LineChart,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	LegendComponent
]);

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(isToday);

const I18N = setupI18n({
	legacy: true,
	allowComposition: true,
	messages: {
		"en-US":
			require(/* webpackChunkName: "locale-[request]" */ "@/lang/en-US.json")
				.default
	},
	fallbackLocale: "en-US"
});

const App = createApp(AppRoot)
	.component("v-chart", ECharts)
	.use(AppStore)
	.use(AppRouter)
	.use(I18N)
	.use(VueHead)
	.use(VueLoading)
	.use(createVfm())
	.use(VueProgressiveImage)
	.use(VueCodeMirror, {
		autoFocus: true,
		indentWithTab: true,
		tabSize: 4,
		extensions: [
			basicSetup,
			json(),
			xml(),
			markdown(),
			linter(jsonParseLinter()),
			lintGutter(),
			hyperLink,
			color
		]
	});

export default App;
