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
	<div class="window-container">
		<div
			v-for="window in refMinimizedWindows"
			:key="window.id"
			:style="{ display: 'none' }"
		>
			<!-- <keep-alive>
				<Server
					v-if="window.isActive(currentRoute)"
					:server-id="window.data.id"
					:window="window.id"
				/>
			</keep-alive> -->
		</div>
		<div
			v-for="window in refOpenWindows"
			v-cloak
			@click="switchWindowFocus(window)"
			:key="window.id"
			:active="window.isActive(currentRoute)"
			class="window"
		>
			<!-- <keep-alive>
				<Server :server-id="window.data.id" :window="window.id" />
			</keep-alive> -->
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";

@Component
export default class PanelServerWindowContainer extends Vue {
	get currentRoute(): Route {
		return this.$route;
	}

	get refOpenWindows(): any[] {
		return [];
	}

	get refMinimizedWindows(): any[] {
		return [];
	}

	switchWindowFocus(window: any): void {
		// checked before if there is more than one window open at the same time
		// with just one window, it tends to fail resulting in "NavigationDuplicated".
		if (this.refOpenWindows.length === 1) return;

		if (!window.isActive(this.currentRoute))
			this.$router.push(window.location);
	}
}
</script>
<style lang="scss" scoped>
.window-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.window {
		flex: 1 0 auto;

		&:not([active]) {
			filter: grayscale(1);
		}
	}
}
</style>
