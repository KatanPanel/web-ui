import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent
} from "echarts/components";
import { use } from "echarts/core";
import ECharts from "vue-echarts";
import { App } from "vue";

use([
	CanvasRenderer,
	LineChart,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	LegendComponent
]);

const install = (app: App) => {
	app.component("v-chart", ECharts);
};

export default install;
