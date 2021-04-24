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
	<div class="window">
		<div class="window-icon">
			<img
				:src="`/img/games/icons/${getServer.game.name.toLowerCase()}.png`"
				:alt="getWindow.name"
			/>
		</div>
		<div class="window-info">
			<div class="window-title">
				{{ getWindow.name }}
			</div>
			<div class="window-description">
				{{ getWindow.title }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import WindowMixin from "@/shared/mixins/window";

@Component
export default class ServerWindow extends mixins(WindowMixin) {}
</script>
<style lang="scss" scoped>
.window {
	background-color: rgba(255, 255, 255, 0.38);
	border-radius: 8px;
	padding: 6px 12px;
	display: flex;
	user-select: none;
	text-decoration: none;

	&:not([active]):hover {
		cursor: pointer;
		background-color: rgba(255, 255, 255, 0.54);
	}

	.window-icon {
		margin-right: 18px;
	}

	.window-icon,
	.window-icon img {
		width: 32px;
		height: 32px;
	}

	.window-info {
		line-height: 1.2;
	}

	.window-title {
		font-weight: 600;
	}

	.window-description {
		font-size: 14px;
		opacity: 0.7;
	}
}
</style>
