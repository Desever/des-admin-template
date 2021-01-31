import Vue from 'vue';
import {returnBylocalStorageData} from "../utils/storage";
import routes from "./routes";
import routerAuth from "../utils/routerAuth";
import VueRouter from 'vue-router';
import Nprogress from "nprogress";
import 'nprogress/nprogress.css';
var routerAuthObj=new routerAuth();
Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});
router.beforeEach((to, from, next) => {
	Nprogress.start();
	var loginState=returnBylocalStorageData("DES_BOOTSTRAP_INFO");
	//先判断是否为404
	if(routerAuthObj.checkNotPage(to.name)){
		//错误界面不做任何验证
		if(to.name=="404"){
			next();
		}else{
			if(loginState){
				if(to.name=="Login"){
					next({
						name:"AppContainer",
						replace:true
					});
				}else{
					next();
				}
			}else{
				if(to.name=="Login"){
					next();
				}else{
					next({
						name:"Login",
						replace:true
					});
				}
			}
		}
	}else{
		next({
			name:"404",
			replace:true
		});
	}
	Nprogress.done();
})


export default router
