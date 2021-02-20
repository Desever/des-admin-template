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
	// Nprogress.start();
	var loginState=returnBylocalStorageData("DES_BOOTSTRAP_INFO");
	//先判断是否为404
	if(routerAuthObj.checkNotPage(to.name)){
		//错误界面不做任何验证
		if(to.name=="404"||to.name=="403"){
			next();
		}else{

			if(loginState){
				if(to.name=="login"){
					next({
						name:"appContainer",
						replace:true
					});
				}else{

					//判断是否进入授权界面
					if(routerAuthObj.checkNotAuth(to.name)){
						next();
					}else{
						next({
							name:"403",
							replace:true
						});
					}

					
				}
			}else{
				if(to.name=="login"){
					next();
				}else{
					next({
						name:"login",
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
	// Nprogress.done();
})


export default router
