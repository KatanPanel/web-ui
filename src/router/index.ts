import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '@/views/Home.vue'
import Login from "@/views/Login.vue";

Vue.use(VueRouter)

export const HOME_ROUTE = "home";
export const LOGIN_ROUTE = "login";

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: HOME_ROUTE,
		component: Home
	},
	{
		path: '/login',
		name: LOGIN_ROUTE,
		component: Login
	}
]

// extension function
VueRouter.prototype.redirect = function (to: string) {
	// avoid arrow-function to be able to use explicit `this`
	window.location.href = this.resolve({ name: to }).href
}

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});
