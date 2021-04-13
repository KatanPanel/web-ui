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
	<div class="advanced-settings">
		<v-tabs>
			<v-tab-link :to="{ name: 'advanced.settings' }"
				>Appearence</v-tab-link
			>
			<v-tab-link :to="{ name: 'advanced.settings.language' }"
				>Language</v-tab-link
			>
			<v-tab-link :to="{ name: 'advanced.settings.performance' }"
				>Performance</v-tab-link
			>
			<v-tab-link :to="{ name: 'advanced.settings.advanced' }"
				>Advanced</v-tab-link
			>
		</v-tabs>
		<router-view />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { generateMetaInfo } from "@/utils/component";
import { MetaInfo } from "vue-meta";
import VTabs from "@/components/ui/tab/VTabs.vue";
import VTabLink from "@/components/ui/tab/VTabLink.vue";

@Component({
	components: { VTabLink, VTabs },
	metaInfo(): MetaInfo {
		return generateMetaInfo("advanced.settings.index");
	},
})
export default class AdvancedSettings extends Vue {}
</script>
