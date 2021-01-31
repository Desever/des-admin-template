import {getData,postData,putData} from "../../utils/http";
import {
	getUserRole,
} from "../../utils/user";
import {saveBylocalStorage} from "../../utils/storage";
import routerAuth from "../../utils/routerAuth";
// var routerAuthObj=new routerAuth();
//实现框架基础功能的基本数据
export default {
	namespaced:true,
    state:{
		//侧边菜单
		menuList:[],
		menuLoading:true,

		//历史导航
		historyTopTabMenuList:[]
    },
    mutations:{
		SET_MENU_LIST(state,menuList){
			state.menuList=menuList;
		},
		MENU_LOADING(state,loading){
			state.menuLoading=loading;
		}
	},
	actions:{

		//获取所有菜单
	 	async getMenuList({commit}){
			commit("MENU_LOADING",true);
			var toRole=getUserRole();
			var roleId=[];
			for(var i=0;i<toRole.length;i++){
				roleId.push(toRole[i]["code"]);
			}
			var menuList=await getData(`menu/roleCodes/${roleId.join(",")}`);
			commit("SET_MENU_LIST",menuList.data);
			commit("MENU_LOADING",false);
		},


		//新建菜单


		//关闭单个菜单


		//关闭所有菜单


	}
}