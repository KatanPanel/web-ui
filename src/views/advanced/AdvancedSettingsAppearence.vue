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
	<v-row>
		<v-col :size="9">
			<h2>{{ $t("views.advanced.settings.appearence.title") }}</h2>
			<AppearenceTheme/>
			<hr/>
			<section id="server">
				<AppearenceServerConsoleLogDate/>
			</section>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import VFieldRadio from "@/components/ui/field/VFieldRadio.vue";
import {generateMetaInfo} from "@/utils/component";
import {MetaInfo} from "vue-meta";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VSelect from "@/components/ui/form/VSelect.vue";
import AppearenceServerConsoleLogDate
	from "@/components/advanced/settings/appearence/AppearenceServerConsoleLogDate.vue";
import AppearenceTheme from "@/components/advanced/settings/appearence/AppearenceTheme.vue";

@Component({
	components: {
		AppearenceTheme,
		AppearenceServerConsoleLogDate,
		VSelect,
		VFlexBox,
		VFieldRadio,
		VField,
		VFieldList,
		VLabel,
		VCol,
		VRow,
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo("advanced.settings.appearence");
	},
})
export default class AdvancedSettingsAppearence extends Vue {
}
</script>
