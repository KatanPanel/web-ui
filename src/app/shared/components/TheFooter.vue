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
	<footer class="v--footer">
		<v-container>
			<p
				v-t="{
					path: 'footer.client-version',
					args: { version: currentVersion },
				}"
			/>
			<i18n path="footer.credits.icons" tag="p">
				<a
					href="https://www.flaticon.com/authors/freepik"
					target="_blank"
					title="Freepik"
				>Freepik</a
				>
				<a
					href="https://www.flaticon.com/"
					target="_blank"
					title="Flaticon"
				>www.flaticon.com</a
				>
			</i18n>
		</v-container>
	</footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";

@Component({
	components: { VContainer }
})
export default class TheFooter extends Vue {
	private readonly currentVersion = process.env.VUE_APP_VERSION;
}
</script>
<style lang="scss" scoped>
.v--footer {
	position: relative;
	margin-bottom: 8px;
	font-size: 14px;
	text-align: center;
	color: var(--kt-text-color);
	width: 100%;
	height: 48px;
	min-height: 48px;
	opacity: 0.7;
	user-select: none;

	p {
		font-size: 14px;
		margin-bottom: 4px;
	}
}
</style>
