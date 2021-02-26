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
	<v-row>
		<v-col :size="6">
			<v-flex-box>
				<h4 class="v--flex-child">Lista de servidores</h4>
				<!-- <v-button :flat="true">Atualizar</v-button> -->
			</v-flex-box>
			<HomeServerList />
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { AuthMixin } from "@/common/internal/mixins/auth";
import { AxiosResponse } from "axios";
import { commit } from "@/common/utils/vuex";
import { UPDATE_BACKEND_INFO } from "@/store/mutations";
import HomeServerList from "@/components/home/HomeServerList.vue";
import { ROOT_MODULE } from "@/store";
import { MetaInfo } from "vue-meta";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VButton from "@/components/ui/button/VButton.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";

@Component({
	components: {
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
		this.$http("/info").then((res: AxiosResponse) => {
			commit(ROOT_MODULE, UPDATE_BACKEND_INFO, res.data.data);
		});
	},
})
export default class Home extends mixins(AuthMixin) {}
</script>
<style lang="scss" scoped>
.last-active-session {
	margin-bottom: 18px;
	margin-top: -12px;
}

.server-list {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	width: 100%;
	margin-top: 12px;

	.server {
		list-style-type: none;
		position: relative;
		padding: 12px;
		background-color: var(--app-foreground-overlay);
		border-radius: 4px;
		display: flex;

		&:hover {
			cursor: pointer;
		}

		&:not(:last-child) {
			margin-bottom: 6px;
		}

		.server-state {
			width: 32px;
			height: 32px;
			background-color: var(--kt-foreground);
			border-radius: 50%;
		}

		.server-info {
			margin-left: 12px;
		}
	}
}
</style>
