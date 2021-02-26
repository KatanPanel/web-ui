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
	<div>
		<HomeActiveServers />
		<HomeAvailableServers />
		<HomeUnloadedServers />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import HomeUnloadedServers from "@/components/home/HomeUnloadedServers.vue";
import HomeAvailableServers from "@/components/home/HomeAvailableServers.vue";
import HomeActiveServers from "@/components/home/HomeActiveServers.vue";
import { dispatch } from "@/common/utils/vuex";
import { ROOT_MODULE } from "@/store";
import { LOAD_SERVER_LIST } from "@/store/actions";

@Component({
	components: {
		HomeActiveServers,
		HomeAvailableServers,
		HomeUnloadedServers,
		VCol,
		VRow,
	},
	async mounted() {
		await dispatch(ROOT_MODULE, LOAD_SERVER_LIST);
	},
})
export default class HomeServerList extends Vue {}
</script>
<style lang="scss">
.server-list {
	display: flex;
	flex-direction: column;
	margin-bottom: 24px;

	.server {
		display: flex;
		flex-direction: row;
		justify-content: center;
		border-bottom: 1px solid transparent;

		&:not([disabled]):hover .server-name {
			color: var(--kt-primary-color);
		}

		&:not([disabled]):not(:last-child) {
			border-bottom-color: rgba(0, 0, 0, 0.06);
		}

		&[disabled] {
			user-select: none;
			.server-state {
				border-color: var(--kt-muted-color);
			}
		}

		.server-state {
			width: 16px;
			height: 16px;
			border: 4px solid var(--kt-primary-color);
			border-radius: 50%;
			margin-right: 8px;

			&.server-state-offline {
				border-left-color: var(--kt-danger-color);
			}
		}

		.server-info {
			flex: 1 0 auto;
			text-decoration: none !important;

			.server-header {
				font-weight: 600;
				font-size: 18px;
				padding-top: 8px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.server-name {
					display: flex;
					align-items: center;

					.server-game {
						width: 24px;
						height: 24px;
						margin-right: 12px;
					}
				}

				.server-ip {
					color: var(--kt-muted-color);
					font-size: 12px;
				}
			}

			.server-description {
				font-size: 14px;
				color: var(--kt-muted-color);
			}
		}

		.server-footer {
			padding-bottom: 12px;
			display: flex;
			justify-content: space-between;
			color: var(--kt-muted-color);

			.server-viewers {
				font-style: italic;
			}
		}
	}

	.add-server {
		background-color: #4b7bec;
		color: #ffffff;
		text-transform: uppercase;
		font-size: 14px;
		font-weight: 600;
		padding: 6px;

		svg {
			fill: #ffffff;
			width: 32px;
			height: 32px;
		}
	}
}
</style>
