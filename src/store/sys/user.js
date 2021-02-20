import {getData,postData,putData,deleteData} from "../../utils/http";
import {
    saveBylocalStorage,
	returnBylocalStorageData,
	returnBySessionStorage
} from "../../utils/storage";
import {getUserOrg} from "../../utils/user";
import moment from "moment";
export default {
	namespaced:true,
	state: {
		tableLoading:true,
		addLoading:false,
		activeItem:null,
		tableList:[],

		//查询条件
		name:"",
		role:"",
		allRole:[],
		orgId:"",
		status:"",
		searchTimer:[moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")],
		pageIndex:1,
		total:0

	},
	mutations: {
       	CHANGE_TABLE_LOADING(state,tableLoading){
			state.tableLoading=tableLoading;
		},
		CHANGE_ADD_LOADING(state,tableLoading){
			state.addLoading=tableLoading;
		},
		CHANGE_TABLE_DATA(state,changeData){
			state.tableList=changeData.data;
			state.total=changeData.total;
		},
		CHANGE_ACTIVE_ITEM(state,item){
			state.activeItem=item;
		},
		CHANGE_SEARCH_COLL(state,changeData){
			state[changeData["changeKey"]]=changeData["data"];
		},
		CHANGE_TABLE_INDEX(state,value){
			state.pageIndex=value;
		}
	},
	actions: { 
        //获取列表
        getList({commit,state}){
            return new Promise((resolve)=>{
				commit("CHANGE_TABLE_LOADING",true);
                getData(`user/page?name=${state.name}&role=${state.role}&orgId=${state.orgId}&status=${state.status}&start=${state.searchTimer[0]}&end=${state.searchTimer[1]}&p=${state.pageIndex}&orderBy='gmtCreate desc'`).then((res)=>{
					commit("CHANGE_TABLE_LOADING",false);
					if(res.state==1){
						for(var i=0;i<res.data.length;i++){
							res.data[i]["gmtCreate"]=moment(res.data[i]["gmtCreate"]).format("YYYY-MM-DD HH:mm:ss");
							res.data[i]["gmtUpdate"]=moment(res.data[i]["gmtUpdate"]).format("YYYY-MM-DD HH:mm:ss");
						}
						commit("CHANGE_TABLE_DATA",res);
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

		//获取角色列表
		getRoleList({commit}){
			getData("role/all?name=").then((res)=>{
				if(res.state==1){
					commit("CHANGE_SEARCH_COLL",{
						data:res.data,
						changeKey:"allRole"
					});
				}
			})
		},

		//添加
		add({commit},addData){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                postData(`user`,addData).then((res)=>{
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
                putData(`user/${state.activeItem.id}`,modifyData).then((res)=>{
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

		//禁用
		disable({commit,state}){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                postData(`user/disable/${state.activeItem.id}`).then((res)=>{
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


		//启用
		enable({commit,state}){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                postData(`user/enable/${state.activeItem.id}`).then((res)=>{
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

		//删除
		remove({commit},id){
			return new Promise((resolve)=>{
				commit("CHANGE_TABLE_LOADING",true);
                deleteData(`user/${id}`).then((res)=>{
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



		//写入当前操作条目
		setActiveItem({commit},item){
			commit("CHANGE_ACTIVE_ITEM",item)
		},

		//写入查询条件
		setSearchData({commit},changeData){
			commit("CHANGE_SEARCH_COLL",changeData)
		},
		//修改分页
		setPageIndex({commit},value){
			commit("CHANGE_TABLE_INDEX",value)
		}

	}
}
