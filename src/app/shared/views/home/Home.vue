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
	<div class="home">
		<h4>Dashboard</h4>
		<v-row>
			<v-col :size="9">
				<i18n class="v--text-fw-300" path="views.home.welcome" tag="h1">
					<template #username>
						<b
							class="v--text-default"
							v-text="authStore.account.username"
						/>
					</template>
				</i18n>
				<p class="v--text-muted">
					{{ $t("views.home.description") }}
				</p>
				<br />
				<i18n
					class="v--text-muted"
					path="views.home.safe-place"
					tag="p"
				>
					<template #permissions>
						<a href="#">{{ $t("views.home.permissions") }}</a>
					</template>
				</i18n>
				<hr />
				<HomeServerList />
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { inject } from "inversify";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import VBoxBody from "@/app/shared/components/ui/box/VBoxBody.vue";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";
import HomeServerList from "@/app/shared/components/home/HomeServerList.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VBox from "@/app/shared/components/ui/box/VBox.vue";
import VBoxHeader from "@/app/shared/components/ui/box/VBoxHeader.vue";
import { AuthStore } from "@/app/auth/auth.store";

@Component({
	components: {
		VBoxBody,
		VBoxHeader,
		VBox,
		HomeServerList,
		VCol,
		VRow,
		VButton,
		VFlexBox
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "home");
	}
})
export default class Home extends Vue {
	@inject(AuthStore) private readonly authStore!: AuthStore;
}
</script>
