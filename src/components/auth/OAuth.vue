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
	<div class="switch-account">
		<div class="header">
			<h2>
				<b>Outras formas de login</b>
			</h2>
		</div>
		<ul class="stored-accounts">
			<li v-for="account in getStoredAccounts" :key="account">
				Stored: {{ account }}
			</li>
		</ul>
		<div class="footer">
			<v-button class="v--button-flat" v-if="isLoggedIn">
				Continuar como {{ getAccount.username }}
			</v-button>
			<v-button
				@click.native="performLogout"
				class="v--button-flat v--button-danger"
			>
				Sair
			</v-button>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { AuthMixin } from "@/mixins/auth";
import VButton from "@/components/ui/button/VButton.vue";
@Component({
	components: { VButton },
})
export default class OAuth extends mixins(AuthMixin) {}
</script>
