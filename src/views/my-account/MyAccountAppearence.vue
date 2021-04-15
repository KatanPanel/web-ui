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
	<div>
		<h4 class="v--m-bottom-4">
			{{ $t("views.my-account.appearence.title") }}
		</h4>
		<AppearenceTheme />
		<AppearenceServerConsoleLogDate class="v--m-top-5" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { generateMetaInfo } from "@/utils/component";
import AppearenceTheme from "@/components/advanced/settings/appearence/AppearenceTheme.vue";
import AppearenceServerConsoleLogDate from "@/components/advanced/settings/appearence/AppearenceServerConsoleLogDate.vue";

@Component({
	components: { AppearenceServerConsoleLogDate, AppearenceTheme },
	metaInfo(): MetaInfo {
		return generateMetaInfo("my-account.appearence");
	},
})
export default class MyAccountAppearence extends Vue {}
</script>
