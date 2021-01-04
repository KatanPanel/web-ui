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
	<div class="breadcrumb" v-if="routes.length > 0">
		<ul>
			<li v-for="(route, index) in routes" :key="index">
				<span v-if="currentRoute.name === route.location">{{
					route.translation
				}}</span>
				<router-link tag="a" :to="{ name: route.location }" v-else>{{
					route.translation
				}}</router-link>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheBreadCrumb extends Vue {
	get currentRoute() {
		return this.$route;
	}

	get routes() {
		const names = [];
		if (this.currentRoute.path != "/")
			names.push({
				location: "panel",
				translation: this.$i18n.t(`routes./`),
			});

		for (const matched of this.$route.matched) {
			if (
				!matched.name ||
				matched.path.length === 0 ||
				matched.path === "/"
			)
				continue;

			names.push({
				location: matched!.name!,
				translation: this.$i18n.t(`routes.${matched.name}`),
			});
		}

		return names;
	}
}
</script>
<style lang="scss" scoped>
.breadcrumb {
	margin-bottom: 18px;
	ul {
		display: flex;

		li {
			list-style: none;

			&:not(:first-child)::before {
				content: "»";
				position: relative;
				margin: 0 6px;
				opacity: 0.54;
			}

			a {
				color: inherit;
				opacity: 0.54;
			}
		}
	}
}
</style>
