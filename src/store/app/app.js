import {getData,postData,putData} from "../../utils/http";
import {
	getUserRole,
} from "../../utils/user";
import {saveBysessionStorage,returnBySessionStorage} from "../../utils/storage";
import routerAuth from "../../utils/routerAuth";
//实现框架基础功能的基本数据
export default {
	namespaced:true,
    state:{
		//侧边菜单
		menuList:[],
		menuLoading:true,

		//历史导航
		historyTopTabMenuList:returnBySessionStorage("HISTORY_TOP_TABMENULIST")?JSON.parse(returnBySessionStorage("HISTORY_TOP_TABMENULIST")):[],
		//当前显示的导航
		activeHistoryTabItem:returnBySessionStorage("ACTIVE_HISTORY_TSB_ITEM")?JSON.parse(returnBySessionStorage("ACTIVE_HISTORY_TSB_ITEM")):null,
	},
	

    mutations:{
		SET_MENU_LIST(state,menuList){
			state.menuList=menuList;
			//写入缓存
			saveBysessionStorage("ROLE_MENU_LIST",JSON.stringify(menuList));
		},
		MENU_LOADING(state,loading){
			state.menuLoading=loading;
		},
		//写入历史导航
		SET_HISTORY_TOP_TABMENULIST(state,targetData){
			if(targetData.data){
				var oldList=state.historyTopTabMenuList;
				//添加
				if(targetData.type=="add"){
					var addFlag=true;
					for(var i=0;i<oldList.length;i++){
						if(oldList[i]["code"]==targetData.data.code){
							addFlag=false;
						}
					}
					if(addFlag){
						oldList.push(targetData.data);
						state.historyTopTabMenuList=oldList;
					}
					state.activeHistoryTabItem=targetData.data;
					saveBysessionStorage("HISTORY_TOP_TABMENULIST",JSON.stringify(state.historyTopTabMenuList));
					saveBysessionStorage("ACTIVE_HISTORY_TSB_ITEM",JSON.stringify(targetData.data));
				}
				//移除
				else{
					var removeIndex="";
					for(var i=0;i<oldList.length;i++){
						if(oldList[i]["code"]==targetData.data.code){
							removeIndex=i;
						}
					}
					oldList.splice(removeIndex,1);
					state.historyTopTabMenuList=oldList;
					saveBysessionStorage("HISTORY_TOP_TABMENULIST",JSON.stringify(state.historyTopTabMenuList));
					
					//如果移除的是非选中路由，则不需要修改选中状态
					if(targetData.data.code==state.activeHistoryTabItem.code){
						if(!oldList[removeIndex-1]&&!oldList[removeIndex]){
							state.activeHistoryTabItem=null;
							saveBysessionStorage("ACTIVE_HISTORY_TSB_ITEM",null);
						}else{
							state.activeHistoryTabItem=oldList[removeIndex-1]||oldList[removeIndex];
							saveBysessionStorage("ACTIVE_HISTORY_TSB_ITEM",JSON.stringify(oldList[removeIndex-1]||oldList[removeIndex]));
						}
					}
				}
			}else{
				state.activeHistoryTabItem=null;
				saveBysessionStorage("ACTIVE_HISTORY_TSB_ITEM",null);
			}
		}
	},
	actions:{

		//获取所有菜单
	 	getMenuList({commit}){
			return new Promise(async (resolve)=>{
				commit("MENU_LOADING",true);
				var toRole=getUserRole();
				var roleId=[];
				for(var i=0;i<toRole.length;i++){
					roleId.push(toRole[i]["code"]);
				}
				var menuList=await getData(`menu/roleCodes/${roleId.join(",")}`);
				
				commit("SET_MENU_LIST",menuList.data);
				commit("MENU_LOADING",false);
				resolve(true);
			})
			
		},

		//新建菜单
		addHistoryTopTabMenu({commit},addData){
			commit("SET_HISTORY_TOP_TABMENULIST",{
				data:addData,
				type:"add"
			});
		},
		//关闭单个菜单
		closeHistoryTOpMenu({commit},removeData){
			console.log(removeData);
			commit("SET_HISTORY_TOP_TABMENULIST",{
				data:removeData,
				type:"remove"
			})
		}

	}
}