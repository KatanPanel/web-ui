import Vue from "vue";
import Axios from "axios";

const vm: Vue = Vue.prototype;
vm.$isDevelopmentMode = process.env.NODE_ENV === "development";
vm.$helpers = { voca: require("voca") };
vm.$http = Axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 5000,
});
