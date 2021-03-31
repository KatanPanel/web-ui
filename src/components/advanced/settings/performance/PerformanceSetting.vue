<!--
  - Copyright (c) 2020-present Katan
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template>
	<section :id="name">
		<v-box :no-shadow="true">
			<v-box-header class="v--m-bottom-4">
				<small class="v--text-cute">{{
					$t(`views.advanced.settings.performance.${name}.title`)
				}}</small>
				<p class="v--text-muted-darker">
					{{
						$t(
							`views.advanced.settings.performance.${name}.description`
						)
					}}
				</p>
				<v-row class="v--m-top-3">
					<v-col :size="6">
						<v-label
							>{{
								$t(
									"views.advanced.settings.performance.fields.performance-impact"
								)
							}}
						</v-label>
						<LowPerformanceImpact
							v-if="level === 0"
							key="low-performance-impact"
						/>
						<MediumPerformanceImpact
							v-else-if="level === 1"
							key="medium-performance-impact"
						/>
						<HighPerformanceImpact
							v-else-if="level === 2"
							key="high-performance-impact"
						/>
					</v-col>
					<v-col :size="6">
						<v-label
							>{{
								$t(
									"views.advanced.settings.performance.fields.category"
								)
							}}
						</v-label>
						<p
							v-text="
								filters
									.map((cat) =>
										$t(
											`views.advanced.settings.performance.categories.${cat}`
										)
									)
									.join(', ')
							"
						/>
					</v-col>
				</v-row>
			</v-box-header>
			<v-box-body>
				<slot />
			</v-box-body>
		</v-box>
		<hr >
	</section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HighPerformanceImpact from "@/components/advanced/settings/performance/HighPerformanceImpact.vue";
import MediumPerformanceImpact from "@/components/advanced/settings/performance/MediumPerformanceImpact.vue";
import LowPerformanceImpact from "@/components/advanced/settings/performance/LowPerformanceImpact.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VLabel from "@/components/ui/form/VLabel.vue";

@Component({
	components: {
		VLabel,
		VCol,
		VRow,
		VBoxBody,
		VBoxHeader,
		VBox,
		LowPerformanceImpact,
		MediumPerformanceImpact,
		HighPerformanceImpact,
	},
})
export default class PerformanceSetting extends Vue {
	@Prop({ type: String, required: true }) private readonly name!: string;

	// performance impact level
	@Prop({ type: Number, default: 0 }) private readonly level!: number;

	@Prop({ type: Array, required: true }) private readonly filters!: string[];
}
</script>
