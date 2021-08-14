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
	<section id="server-settings-console-log-date">
		<h4 v-text="$t('server.settings.console-log-date.title')" />
		<p>
			{{ $t("server.settings.console-log-date.description") }}
		</p>
		<v-select :options="options" @change="updateConsoleLogDate" />
	</section>
</template>
<script lang="ts">
import { Component, InjectReactive, Vue } from "vue-property-decorator";
import VSelect, {
	SelectOption
} from "@/app/shared/components/ui/form/VSelect.vue";
import { inject } from "inversify-props";
import { UserSettingsPresenter } from "@/app/user-settings/user-settings.presenter";
import { ServerModel } from "@/app/server/models/server.model";
import { undefinedToNull } from "@/app/shared/utils";

@Component({
	components: { VSelect }
})
export default class ServerSettingsShowConsoleLogDate extends Vue {
	readonly options: readonly SelectOption[] = Object.freeze(
		["hover", "click", "never"].map((value: string) => {
			return {
				id: value,
				value: this.$i18n.t(
					`server.settings.console-log-date.option.${value}`
				) as string,
				active: this.currentValue === value
			};
		})
	);
	@InjectReactive()
	private readonly server!: ServerModel;
	@inject()
	private readonly userClientSettingsPresenter!: UserSettingsPresenter;

	get currentValue(): string | null {
		return undefinedToNull(
			this.userClientSettingsPresenter.getSettings.serverSettings[
				this.server.id
			]?.showConsoleLogDate
		);
	}

	updateConsoleLogDate(option: SelectOption) {
		// TODO: fix this
		// this.userClientSettingsPresenter.updateSettings({
		// 	serverSettings: {
		// 		[this.server.id]: {
		// 			showConsoleLogDate: option.id
		// 		}
		// 	}
		// });
	}
}
</script>
