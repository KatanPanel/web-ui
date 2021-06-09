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
	<ul class="children">
		<li
			v-for="child of getChildrenExcludingActive"
			:key="child.id"
			:class="{ active: child.isActive }"
		>
			<router-link :to="getChildrenLocation(child)">
				<AppNavigationNavigationWindowIcon
					:icon="child.getIcon()"
					class="icon"
				/>
				<span :title="child.title" class="title" v-text="child.title" />
			</router-link>
		</li>
	</ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppNavigationWindowChildren } from "@/app/app-navigation/models/app-navigation-window.model";
import AppNavigationNavigationWindowIcon from "@/app/app-navigation/components/navigation-window/AppNavigationNavigationWindowIcon.vue";
import { Location, Route } from "vue-router";
import { routeToLocation } from "@/app/app-navigation/utils/navigation";

@Component({
	components: {
		AppNavigationNavigationWindowIcon
	}
})
export default class AppNavigationWindowsBarItemChildrenList extends Vue {
	@Prop({ type: Array, required: true })
	private readonly children!: AppNavigationWindowChildren[];

	get getChildrenExcludingActive(): AppNavigationWindowChildren[] {
		return this.children.filter((value) => !value.isActive);
	}

	getChildrenLocation(child: AppNavigationWindowChildren): Location {
		return routeToLocation(child.location as Route);
	}
}
</script>
<style lang="scss" scoped>
.children {
	position: absolute;
	visibility: hidden;
	width: 100%;
	margin: -2px 0;
	z-index: 1;
	font-size: 14px;
	background-color: var(--kt-background-secondary);
	border-bottom-right-radius: 4px;
	border-bottom-left-radius: 4px;
	color: var(--kt-text-color);
	box-shadow: rgba(0, 0, 0, 0.12) 0 0 4px 0;
	padding: 8px 0;

	li {
		padding: 0 4px;

		&:hover,
		&:focus {
			.icon {
				opacity: var(--kt-icon-opacity-focused);
			}

			.title {
				color: inherit;
			}
		}

		a {
			display: flex;
			align-items: center;
			position: relative;
			padding: 4px 8px;
			width: 100%;
			text-decoration: none;
			border-radius: 4px;
			min-height: 32px;

			&:hover {
				background-color: var(--kt-border-accent);
			}
		}

		.icon {
			margin-right: 8px;
			opacity: var(--kt-icon-opacity-unfocused);
		}

		.title {
			user-select: none;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			flex-grow: 1;
		}
	}
}
</style>
