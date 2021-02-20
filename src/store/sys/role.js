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
        //获取列表
        getList({commit,state}){
            return new Promise((resolve)=>{
				commit("CHANGE_TABLE_LOADING",true);
                getData("role/all?name="+state.searchKey).then((res)=>{
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

		//添加角色
		addRole({commit},addData){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                postData(`role/`,addData).then((res)=>{
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


		//修改
		modify({commit,state},modifyData){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                putData(`role/${state.activeItem.id}`,modifyData).then((res)=>{
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


		//获取未添加权限
		getNotAddList({commit},params){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                getData(`permission/more/role/${params.roleId}/type/${params.type}`).then((res)=>{
					commit("CHANGE_ADD_LOADING",false);
					if(res.state==1){
						var returnData=[];
						for(var i=0;i<res.data.length;i++){
							returnData.push({
								key:res.data[i]["permissionId"],
								label:res.data[i]["permissionName"]
							});
						}
                        resolve({
							state:1,
							data:returnData,
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

		//获取已经添加的权限
		getIsAddList({commit},params){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                getData(`permission/role/${params.roleId}/type/${params.type}`).then((res)=>{
					commit("CHANGE_ADD_LOADING",false);
					if(res.state==1){
						var returnData=[];
						for(var i=0;i<res.data.length;i++){
							returnData.push({
								key:res.data[i]["permissionId"],
								label:res.data[i]["permissionName"]
							});
						}
                        resolve({
							state:1,
							data:returnData,
                            msg:"操作成功"
                        });
                    }else{
                        resolve({
							state:0,
							data:[],
                            msg:res.msg
                        });
                    }
                })
            })
		},

		
		//取消授权
		permissionRevoke({commit},params){
			return new Promise((resolve)=>{
                postData(`permission/revoke`,params).then((res)=>{
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


		//授权
		permissionEmpower({commit},params){
			return new Promise((resolve)=>{
                postData(`permission/empower`,params).then((res)=>{
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


		//删除角色
		remove({commit},id){
			return new Promise((resolve)=>{
				commit("CHANGE_TABLE_LOADING",true);
                deleteData(`role/${id}`).then((res)=>{
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


		//写入当前操作t条目
		setActiveItem({commit},item){
			commit("CHANGE_ACTIVE_ITEM",item)
		},

		//修改关键词
		changeSearchKey({commit},value){
			commit("CHANGE_SEARCH_KEY",value)
		},




		//修改loading
		changeAddloading({commit},value){
			commit("CHANGE_ADD_LOADING",value);
		}


	}
}
