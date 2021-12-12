import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
	state: () => ({}),
	strict: process.env.NODE_ENV !== "production",
	devtools: process.env.NODE_ENV !== "production"
});
