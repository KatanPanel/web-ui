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
	<ContentLoader
		:height="height"
		:width="width"
		primary-color="#d9d9d9"
		secondary-color="#ecebeb"
	>
		<rect height="7" rx="3" ry="3" width="123" x="103" y="12" />
		<rect height="6" rx="3" ry="3" width="171" x="102" y="152" />
		<circle cx="44" cy="42" r="38" />
		<circle cx="44" cy="147" r="38" />
		<circle cx="44" cy="251" r="38" />
		<rect height="7" rx="3" ry="3" width="123" x="105" y="117" />
		<rect height="7" rx="3" ry="3" width="123" x="104" y="222" />
		<rect height="6" rx="3" ry="3" width="171" x="105" y="48" />
		<rect height="6" rx="3" ry="3" width="171" x="104" y="257" />
	</ContentLoader>
</template>
<script lang="ts">
import { ContentLoader } from "vue-content-loader";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	components: { ContentLoader }
})
export default class ListWithThumbnailLoader extends Vue {
	@Prop({ type: Number })
	private readonly width!: number;

	@Prop({ type: Number })
	private readonly height!: number;
}
</script>
