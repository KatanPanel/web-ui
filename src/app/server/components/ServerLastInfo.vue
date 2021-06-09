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
	<div class="server-last-info-container">
		<div
			v-if="collapsed"
			key="hidden"
			class="server-last-info-toggle"
			@click="toggle"
		>
			<v-icon name="caret-down" />
		</div>
		<div v-else key="visible" class="server-last-info">
			<router-link :to="{ name: 'server.overview' }">
				<Avatar :src="server.icon" class="server-icon" />
			</router-link>
			<div class="server-data">
				<router-link
					:to="{ name: 'server.overview' }"
					class="server-name"
					>{{ server.name }}
				</router-link>
				<div class="server-description">
					<Copyable
						:copy-value="`${server.host}:${server.port}`"
						class="server-ip"
					>
						{{ server.host }}:{{ server.port }}
					</Copyable>
					<div :class="[server.state]" class="server-state">
						{{ $t(`views.server.state.${server.state}`) }}
					</div>
				</div>
			</div>
			<v-dropdown>
				<v-icon class="state-switcher dot" name="dot-horizontal" />
				<template v-slot:items>
					<v-dropdown-item
						v-if="server.state === 'running'"
						key="turn-off"
						@click="$emit('action:stop')"
					>
						Stop
					</v-dropdown-item>
					<v-dropdown-item
						v-else
						key="turn-on"
						@click="$emit('action:start')"
					>
						Start
					</v-dropdown-item>
					<v-dropdown-item
						v-if="userSettings.ui.developerMode"
						@click="copyServerId"
					>
						Copy ID
					</v-dropdown-item>
				</template>
			</v-dropdown>
			<div class="toggler" @click="visible = !visible">
				<v-icon name="caret-up" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, InjectReactive } from "vue-property-decorator";
import Vue from "vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import Avatar from "@/app/shared/components/Avatar.vue";
import Copyable from "@/app/shared/components/Copyable.vue";
import VDropdown from "@/app/shared/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/app/shared/components/ui/dropdown/VDropdownItem.vue";
import { copyValue } from "@/app/shared/utils/dom";
import { lazyInject } from "@/ioc";
import { ServerModel } from "@/app/server/models/server.model";
import { UserSettingsModel } from "@/app/user-settings/models/user-settings.model";

@Component({
	components: { VDropdownItem, VDropdown, Copyable, Avatar, VIcon }
})
export default class ServerLastInfo extends Vue {
	collapsed = true;
	@InjectReactive()
	private readonly server!: ServerModel;
	@lazyInject()
	private readonly userSettings!: UserSettingsModel;

	toggle(): void {
		this.collapsed = !this.collapsed;
	}

	copyServerId(): void {
		copyValue(this.server.id.toString());
	}
}
</script>
<style lang="scss" scoped>
.server-last-info-container {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	margin-top: -48px;

	.server-last-info-toggle {
		background-color: var(--kt-background-secondary);
		box-shadow: var(--kt-shadow) 0 0 4px 0;
		min-width: 360px;
		height: 12px;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;

		&:hover {
			cursor: pointer;

			svg {
				fill: var(--kt-muted-color);
			}
		}

		svg {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 20px;
			width: 16px;
			height: 16px;
			fill: var(--kt-muted-darker-color);
		}
	}

	.server-last-info {
		background-color: var(--kt-background-secondary);
		box-shadow: var(--kt-shadow) 0 0 4px 0;
		display: flex;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		padding: 8px;
		min-width: 360px;
		align-items: center;

		.server-icon {
			width: 40px;
			height: 40px;
		}

		.server-data {
			line-height: 1.2;
			flex: 1;

			.server-name {
				font-weight: 600;

				&:not(:hover) {
					text-decoration: none;
				}
			}

			.server-description {
				display: flex;
				font-size: 12px;
				color: var(--kt-muted-color);

				.server-ip {
					margin-right: 4px;

					&::after {
						content: "•";
						opacity: 0.38;
						display: inline-block;
					}
				}
			}

			.server-state {
				user-select: none;

				&.unknown {
					color: var(--kt-danger-darker-color);
				}
			}
		}

		.toggler {
			justify-self: flex-end;
			margin-right: 8px;

			&:hover {
				cursor: pointer;

				svg {
					fill: currentColor;
				}
			}

			svg {
				width: 16px;
				height: 16px;
				fill: var(--kt-muted-darker-color);
			}
		}

		.state-switcher {
			margin-right: 16px;
			width: 16px;
			height: 16px;
			fill: var(--kt-muted-darker-color);

			&:hover {
				cursor: pointer;
				fill: var(--kt-muted-color);
			}
		}
	}
}
</style>
