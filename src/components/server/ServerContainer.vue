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
	<transition-group
		name="v--transition-list"
		tag="div"
		class="window-container"
	>
		<div
			v-for="window in getAllWindows"
			:key="window.windowId"
			v-show="window.isOpen"
			:active="window.matchesLocation(currentRoute)"
			class="window v--transition-list-item"
			@click="switchWindowFocus(window)"
		>
			<component
				:is="'window'"
				:server-id="window.data.id.toString()"
				:window="window.windowId"
			/>
		</div>
	</transition-group>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Route } from "vue-router";
import { Window } from "@/store/state";
import { mixins } from "vue-class-component";
import { AppMixin } from "@/mixins/app";

@Component
export default class ServerContainer extends mixins(AppMixin) {
	private get currentRoute(): Route {
		return this.$route;
	}

	private switchWindowFocus(window: Window): void {
		// we checked before if there is more than one window open at the same time
		// with just one window, it tends to fail resulting in "NavigationDuplicated".
		if (this.getOpenWindows.length === 1) return;

		if (!window.matchesLocation(this.currentRoute))
			this.$router.push(window.getLocation());
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
