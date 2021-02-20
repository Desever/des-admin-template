import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import upms from "../store/upms/upms";
import app from "../store/app/app";
//菜单管理
import menu from "../store/sys/menu";
//角色管理
import role from "../store/sys/role";
//操作管理
import operation from "../store/sys/operation";
//机构管理
import org from "../store/sys/org";
//用户
import user from "../store/sys/user";
export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		upms,
		app,
		role,
		menu,
		operation,
		org,
		user
	}
})
