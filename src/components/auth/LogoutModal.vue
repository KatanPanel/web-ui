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
		<v-modal-title>
			{{ $t("views.logout.title") }}
		</v-modal-title>
		<p class="v--text-muted">
			{{ $t("views.logout.description") }}
		</p>
		<v-modal-footer>
			<v-button @click="$emit('close')">
				{{ $t("views.logout.buttons.cancel") }}
			</v-button>
			<v-button :danger="true" @click="performLogout">
				{{ $t("views.logout.buttons.confirm") }}
			</v-button>
		</v-modal-footer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AUTH_MODULE } from "@/store";
import { GET_ACCOUNT } from "@/store/modules/auth/getters";
import { dispatch, get } from "@/utils/vuex";
import VModalTitle from "@/components/ui/modal/VModalTitle.vue";
import VModalFooter from "@/components/ui/modal/VModalFooter.vue";
import VButton from "@/components/ui/button/VButton.vue";
import { AUTH_LOGOUT } from "@/store/modules/auth/actions";

@Component({
	components: { VButton, VModalFooter, VModalTitle },
})
export default class LogoutModal extends Vue {
	get accountUsername(): string {
		return get(AUTH_MODULE, GET_ACCOUNT).username;
	}

	private performLogout(): void {
		dispatch(AUTH_MODULE, AUTH_LOGOUT).then(() => {
			this.$emit("close");
			this.$router.replace({ name: "login" });
		});
	}
}
</script>
