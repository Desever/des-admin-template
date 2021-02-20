import {getData,postData,putData,deleteData} from "../../utils/http";
import {
    saveBylocalStorage,
	returnBylocalStorageData,
	returnBySessionStorage
} from "../../utils/storage";
import moment from "moment";
export default {
	namespaced:true,
	state: {
		tableLoading:true,
		addLoading:false,
		activeItem:null,
		tableList:[],
		searchKey:""
	},
	mutations: {
       	CHANGE_TABLE_LOADING(state,tableLoading){
			state.tableLoading=tableLoading;
		},
		CHANGE_ADD_LOADING(state,tableLoading){
			state.addLoading=tableLoading;
		},
		CHANGE_TABLE_DATA(state,list){
			state.tableList=list;
		},
		CHANGE_ACTIVE_ITEM(state,item){
			state.activeItem=item;
		},
		CHANGE_SEARCH_KEY(state,key){
			state.searchKey=key;
		}
	},
	actions: { 
        //获取菜单列表
        getList({commit,state}){
            return new Promise((resolve)=>{
				commit("CHANGE_TABLE_LOADING",true);
                getData("menu/all?key="+state.searchKey).then((res)=>{
					commit("CHANGE_TABLE_LOADING",false);
					if(res.state==1){
						for(var i=0;i<res.data.length;i++){
							res.data[i]["gmtCreate"]=moment(res.data[i]["gmtCreate"]).format("YYYY-MM-DD HH:mm:ss");
							res.data[i]["gmtUpdate"]=moment(res.data[i]["gmtUpdate"]).format("YYYY-MM-DD HH:mm:ss");
						}
						commit("CHANGE_TABLE_DATA",res.data);
                        resolve({
                            state:1,
                            msg:"操作成功"
                        });
                    }else{
                        resolve({
                            state:0,
                            msg:res.msg
                        });
                    }
                })
            })
		},

		//添加菜单
		add({commit},addData){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                postData(`menu/`,addData).then((res)=>{
					commit("CHANGE_ADD_LOADING",false);
					if(res.state==1){
						resolve({
                            state:1,
                            msg:"操作成功"
                        });
                    }else{
                        resolve({
                            state:0,
                            msg:res.msg
                        });
                    }
                })
            })
		},

		//修改菜单
		modify({commit,state},modifyData){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                putData(`menu/${state.activeItem.id}`,modifyData).then((res)=>{
					commit("CHANGE_ADD_LOADING",false);
					if(res.state==1){
						resolve({
                            state:1,
                            msg:"操作成功"
                        });
                    }else{
                        resolve({
                            state:0,
                            msg:res.msg
                        });
                    }
                })
            })
		},

		//删除菜单
		remove({commit},id){
			return new Promise((resolve)=>{
				commit("CHANGE_TABLE_LOADING",true);
                deleteData(`menu/${id}`).then((res)=>{
					commit("CHANGE_TABLE_LOADING",false);
					if(res.state==1){
						resolve({
                            state:1,
                            msg:"操作成功"
                        });
                    }else{
                        resolve({
                            state:0,
                            msg:res.msg
                        });
                    }
                })
            })
		},


		//禁用菜单
		disable({commit,state}){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                postData(`menu/disable/${state.activeItem.id}`).then((res)=>{
					commit("CHANGE_ADD_LOADING",false);
					if(res.state==1){
						resolve({
                            state:1,
                            msg:"操作成功"
                        });
                    }else{
                        resolve({
                            state:0,
                            msg:res.msg
                        });
                    }
                })
            })
		},


		//启用菜单
		enable({commit,state}){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                postData(`menu/enable/${state.activeItem.id}`).then((res)=>{
					commit("CHANGE_ADD_LOADING",false);
					if(res.state==1){
						resolve({
                            state:1,
                            msg:"操作成功"
                        });
                    }else{
                        resolve({
                            state:0,
                            msg:res.msg
                        });
                    }
                })
            })
		},




		//写入当前操作菜单
		setActiveItem({commit},item){
			commit("CHANGE_ACTIVE_ITEM",item)
		},

		//修改关键词
		changeSearchKey({commit},value){
			commit("CHANGE_SEARCH_KEY",value)
		},


	}
}
