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
		<v-row>
			<v-col :size="9">
				<i18n class="v--text-fw-300" path="views.home.welcome" tag="h1">
					<template #username>
						<b class="v--text-default" v-text="account.username" />
					</template>
				</i18n>
				<p class="v--text-muted">
					{{ $t("views.home.description") }}
				</p>
				<br >
				<i18n
					class="v--text-muted"
					path="views.home.safe-place"
					tag="p"
				>
					<template #permissions>
						<a href="#">{{ $t("views.home.permissions") }}</a>
					</template>
				</i18n>
				<hr >
				<HomeServerList />
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { commit, get } from "@/utils/vuex";
import { UPDATE_BACKEND_INFO } from "@/store/mutations";
import HomeServerList from "@/components/home/HomeServerList.vue";
import { AUTH_MODULE, ROOT_MODULE } from "@/store";
import { MetaInfo } from "vue-meta";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VButton from "@/components/ui/button/VButton.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import { GET_ACCOUNT } from "@/store/modules/auth/getters";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";

@Component({
	components: {
		VBoxBody,
		VBoxHeader,
		VBox,
		HomeServerList,
		VCol,
		VRow,
		VButton,
		VFlexBox,
	},
	metaInfo(): MetaInfo {
		return {
			title: process.env.VUE_APP_NAME,
			titleTemplate: undefined,
		};
	},
	mounted(): void {
		this.$api.info.getInfo().then((info: any) => {
			commit(ROOT_MODULE, UPDATE_BACKEND_INFO, info);
		});
	},
})
export default class Home extends Vue {
	get account(): any {
		return get(AUTH_MODULE, GET_ACCOUNT);
	}
}
</script>
