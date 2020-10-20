<template>
	<v-container class="v--flex v--flex-justify-center v--full-height">
		<v-box class="v--box-fit">
			<v-box-header>
				<h4 v-t="'login.title'" />
				<p class="v--text-error" v-if="error" v-text="error" />
			</v-box-header>
			<v-box-body>
				<v-form @submit.native.prevent="onFormSubmit">
					<v-input-group>
						<v-label v-t="'login.fields.username'" />
						<v-input
							type="text"
							minlength="2"
							maxlength="32"
							required
							v-model="username"
						/>
					</v-input-group>
					<v-input-group>
						<v-label v-t="'login.fields.password'" />
						<v-input
							type="password"
							maxlength="32"
							value=""
							v-model="password"
						/>
					</v-input-group>
					<v-input-group>
						<v-flex-box class="v--flex-justify-end">
							<v-button
								type="submit"
								v-t="'login.fields.confirm'"
								:disabled="
									$helpers.voca.isBlank(username) || isLocked
								"
							/>
						</v-flex-box>
					</v-input-group>
				</v-form>
			</v-box-body>
		</v-box>
	</v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VBox from "@/components/ui/box/VBox.vue";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VButton from "@/components/ui/button/VButton.vue";
import VForm from "@/components/ui/form/VForm.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VInput from "@/components/ui/form/VInput.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import { MetaInfo } from "vue-meta";
import { AUTH_TOKEN_KEY } from "@/store/auth";
import { AUTH_MODULE } from "@/store";
import { AUTH_LOGIN, AUTH_VERIFY } from "@/store/auth/actions";
import { AxiosError } from "axios";
import { HOME_ROUTE } from "@/router";

@Component<Login>({
	components: {
		VFlexBox,
		VInput,
		VLabel,
		VInputGroup,
		VForm,
		VButton,
		VBoxBody,
		VBoxHeader,
		VCol,
		VRow,
		VContainer,
		VBox,
	},
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("login.title")! as string,
		};
	},
})
export default class Login extends Vue {
	username = "";
	password = "";
	isLocked = false;

	// must be null due to reactivity
	error: string | null = null;

	onFormSubmit(): void {
		this.isLocked = true;
		this.$store
			.dispatch(AUTH_MODULE.concat("/", AUTH_LOGIN), {
				username: this.username,
				password: this.password,
			})
			.then(async (token: string) => {
				// there is no self-validation due to a possible fast
				// invalidation for any reason by the server.
				this.$storage.set(AUTH_TOKEN_KEY, token);

				await this.$store.dispatch(
					AUTH_MODULE.concat("/", AUTH_VERIFY),
					token
				);
				this.$router.redirect(HOME_ROUTE);
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data;
				if (this.$isDevelopmentMode) console.log(data);

				this.error = this.$i18n.t("errors." + data.code)! as string;
			})
			.then(() => (this.isLocked = false));
	}
}
</script>
