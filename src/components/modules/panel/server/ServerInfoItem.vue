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
	<div class="server-info-item">
		<div class="server-header">
			<div
				:style="{
					backgroundImage: `url(${
						server.icon || `/img/logo-white-filled.png`
					})`
				}"
				class="server-icon"
			/>
			<div class="server-info">
				<div class="server-name">
					{{ server.name }}
				</div>
				<div class="server-description">
					<slot name="description" />
					<div
						v-if="showStatus"
						:class="`server-state ${server.state}`"
					>
						{{ $t(`views.server.state.${server.state}`) }}
					</div>
				</div>
			</div>
			<div v-if="showIp" class="server-ip">
				<Copyable :copy-value="`${server.host}:${server.port}`">
					<code>{{ server.host }}:{{ server.port }}</code>
				</Copyable>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Copyable from "@/components/shared/Copyable.vue";

@Component({
	components: { Copyable }
})
export default class ServerInfoItem extends Vue {
	@Prop({ type: Object, required: true }) private readonly server!: any;
	@Prop({ type: Boolean, default: true }) private readonly showIp!: boolean;
	@Prop({ type: Boolean, default: true })
	private readonly showStatus!: boolean;
}
</script>
<style lang="scss" scoped>
.server-info-item {
	border-radius: 4px;
	background-color: var(--kt-background-tertiary);

	&:not([disabled]):hover {
		background-color: var(--kt-background-accent);
	}

	.server-header {
		display: flex;
		padding: 8px;

		.server-icon {
			width: 40px;
			height: 40px;
			box-shadow: inset var(--kt-shadow) 0 0 8px -1px;
			border-radius: 50%;
			margin-right: 16px;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			padding: 8px;
		}

		.server-info {
			flex: 1;
			line-height: 1;
			justify-content: center;
			display: flex;
			flex-direction: column;

			.server-name {
				font-weight: 600;
			}

			.server-description {
				font-size: 12px;
				color: var(--kt-muted-color);
				display: flex;

				div:not(:last-child) {
					margin-right: 4px;

					&::after {
						content: "•";
						opacity: 0.38;
						display: inline-block;
						margin-left: 4px;
					}
				}

				.server-state {
					&.unknown {
						color: var(--kt-danger-darker-color);
					}
				}
			}
		}

		.server-ip {
			font-size: 12px;
			color: var(--kt-muted-darker-color);
		}
	}

	.server-body {
		margin: 0 64px;
		padding: 0 0 8px 0;
	}
}
</style>
