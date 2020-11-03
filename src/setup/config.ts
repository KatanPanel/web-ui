import Vue from "vue";

const isDevelopmentMode = process.env.NODE_ENV === "development";
Vue.config.devtools = isDevelopmentMode;
Vue.config.performance = isDevelopmentMode;
Vue.config.productionTip = isDevelopmentMode;
