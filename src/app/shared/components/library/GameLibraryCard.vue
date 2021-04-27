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
	<div
		:style="{ backgroundImage: `url(/img/games/tmp/${game.id}.jpg)` }"
		class="game-library-card"
	>
		<div class="game-footer">{{ game.name }}</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameLibraryCard extends Vue {
	@Prop({ type: Object, required: true }) private readonly game!: any;
}
</script>
<style lang="scss" scoped>
.game-library-card {
	background-size: cover;
	background-position: center;
	background-attachment: scroll;
	background-repeat: no-repeat;
	width: 200px;
	height: 200px;
	position: relative;
	border-radius: 4px;
	margin-right: 4px;

	&:hover {
		cursor: pointer;

		.game-footer {
			opacity: 1;
		}
	}

	.game-footer {
		opacity: 0;
		z-index: 2;
		width: 100%;
		background-color: var(--kt-primary-color);
		color: var(--kt-primary-text-color);
		font-size: 16px;
		transition: opacity linear 200ms;
		padding: 2px 8px;
		position: absolute;
		bottom: 0;
	}
}
</style>
