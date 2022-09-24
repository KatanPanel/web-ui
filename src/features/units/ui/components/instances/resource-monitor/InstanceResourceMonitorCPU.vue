<template>
	<v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
	CanvasRenderer,
	LineChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent
]);

export default defineComponent({
	name: "HelloWorld",
	components: {
		VChart
	},
	setup() {
		const option = ref({
			xAxis: {
				type: "category",
				data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
			},
			yAxis: {
				type: "value"
			},
			series: [
				{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: "line",
					smooth: true
				}
			]
		});

		return { option };
	}
});
</script>

<style scoped>
.chart {
	height: 400px;
}
</style>
