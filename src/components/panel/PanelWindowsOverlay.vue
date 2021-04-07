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
	<div class="panel-windows-overlay" @click="$emit('close')">
		<div class="panel-windows-overlay-inner">
			<h4 class="v--m-bottom-5">Em segundo plano</h4>
			<hr/>
			<small class="v--text-uppercase v--text-fw-800"
			>Janela atual – {{ getOpenWindows.length }}</small
			>
			<ul class="window-list v--m-bottom-3">
				<li
					v-for="window in getOpenWindows"
					:key="window.id"
					:active="true"
				>
					<WindowLink :check="window.id" tag="a">
						<ServerInfoItem :server="window.data" :show-ip="false">
							<template v-slot:description>
								<div>{{ window.title }}</div>
							</template>
						</ServerInfoItem>
					</WindowLink>
				</li>
			</ul>

			<small class="v--text-uppercase v--text-fw-800"
			>Minimizado – {{ getMinimizedWindows.length }}</small
			>
			<ul class="window-list">
				<li
					v-for="window in getMinimizedWindows"
					:key="window.id"
					@click.native="refSwitchWindow(window) + $emit('close')"
				>
					<WindowLink :check="window.id" tag="a">
						<ServerInfoItem
							:server="window.data"
							:show-ip="false"
							:show-status="false"
						>
							<template v-slot:description>
								<div>{{ window.title }}</div>
							</template>
						</ServerInfoItem>
					</WindowLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {
	getWindowsBy,
	MinimizedWindowState,
	OpenWindowState,
	switchWindow,
	Window,
} from "@/common/navigation/window";
import WindowLink from "@/components/navigation/WindowLink.vue";
import ServerInfoItem from "@/components/server/ServerInfoItem.vue";

@Component({
	components: {ServerInfoItem, WindowLink},
})
export default class PanelWindowsOverlay extends Vue {
	get getOpenWindows(): Window[] {
		return getWindowsBy(OpenWindowState);
	}

	get getMinimizedWindows(): Window[] {
		return getWindowsBy(MinimizedWindowState);
	}

	refSwitchWindow(window: Window) {
		switchWindow(window);
	}
}
</script>
<style lang="scss" scoped>
.panel-windows-overlay {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 1;

	.panel-windows-overlay-inner {
		position: fixed;
		background-color: var(--kt-background-secondary);
		right: 0;
		height: 100%;
		border-top-left-radius: 10%;
		border-bottom-left-radius: 10%;
		padding: 48px;
		z-index: 1001;
		box-shadow: var(--kt-border-color) -2px 0 8px 0;
		min-width: 40%;
		max-width: 80%;
	}

	.window-list li a {
		text-decoration: none;
	}
}
</style>
