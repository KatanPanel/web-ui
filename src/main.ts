import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import router from "./router";
import i18n from "@/i18n";
import "./directives";
import "./setup/config";
import "./setup/hooks";
import "./setup/plugins";
import "./setup/layouts";

new Vue({
	store,
	router,
	i18n,
	render: (h) => h(App),
}).$mount("#app");
