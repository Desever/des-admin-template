import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import upms from "../store/upms/upms";
import app from "../store/app/app";
export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		upms,
		app
	}
})
