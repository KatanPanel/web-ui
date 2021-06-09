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
	<div class="my-account-sidebar">
		<ul>
			<router-link :to="{ name: 'account' }" tag="li">
				<a>{{ $t("views.my-account.sidebar.account") }}</a>
			</router-link>
			<router-link :to="{ name: 'account.security' }" tag="li">
				<a>{{ $t("views.my-account.sidebar.security") }}</a>
			</router-link>
			<router-link :to="{ name: 'account.activity-history' }" tag="li">
				<a>{{ $t("views.my-account.sidebar.activity-history") }}</a>
			</router-link>
		</ul>
		<hr />
		<ul>
			<router-link :to="{ name: 'account.appearence' }" tag="li">
				<a>{{ $t("views.my-account.sidebar.appearence") }}</a>
			</router-link>
			<router-link :to="{ name: 'account.language' }" tag="li">
				<a>{{ $t("views.my-account.sidebar.language") }}</a>
			</router-link>
			<router-link :to="{ name: 'account.performance' }" tag="li">
				<a>{{ $t("views.my-account.sidebar.performance") }}</a>
			</router-link>
		</ul>
		<hr />
		<ul>
			<router-link :to="{ name: 'account.advanced' }" tag="li">
				<a>{{ $t("views.my-account.sidebar.advanced") }}</a>
			</router-link>
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Avatar from "@/app/shared/components/Avatar.vue";
import VTab from "@/app/shared/components/ui/tab/VTab.vue";
import VTabs from "@/app/shared/components/ui/tab/VTabs.vue";
import VDropdown from "@/app/shared/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/app/shared/components/ui/dropdown/VDropdownItem.vue";

@Component({
	components: { Avatar, VDropdownItem, VDropdown, VTabs, VTab }
})
export default class TheUserSettingsSidebar extends Vue {}
</script>
<style lang="scss" scoped>
.my-account-sidebar {
	position: fixed;
	background-color: var(--kt-background-secondary);
	top: 0;
	bottom: 0;
	left: 0;
	margin-left: 100px;
	width: 240px;
	padding: 36px 16px;
	overflow-y: auto;
	.account-info {
		margin: 0 -16px;
		padding: 0 16px 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 8px;
		.avatar {
			width: 96px;
			height: 96px;
		}
		.username {
			margin-top: 16px;
			font-weight: 600;
			line-height: 1;
		}
		.role {
			font-size: 12px;
			color: var(--kt-muted-color);
		}
	}
	ul {
		li {
			position: relative;
			&.router-link-exact-active a {
				color: var(--kt-text-color);
				font-weight: 600;
			}
			a {
				display: block;
				padding: 4px 8px;
				border-radius: 4px;
				text-decoration: none;
				font-weight: 500;
				font-size: 14px;
				color: var(--kt-muted-color);
			}
			&:not(.router-link-exact-active):hover a {
				color: var(--kt-text-color);
			}
		}
	}
	hr {
		margin: 1.2rem 0;
	}
}
</style>
