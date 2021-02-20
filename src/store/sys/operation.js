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
		searchKey:"",
		total:0,
		pageIndex:1
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
		CHANGE_SEARCH_KEY(state,key){
			state.searchKey=key;
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
                getData(`operation/page?key=${state.searchKey}&p=${state.pageIndex}`).then((res)=>{
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

		//添加
		add({commit},addData){
			return new Promise((resolve)=>{
				commit("CHANGE_ADD_LOADING",true);
                postData(`operation/`,addData).then((res)=>{
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
                putData(`operation/${state.activeItem.id}`,modifyData).then((res)=>{
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
                deleteData(`operation/${id}`).then((res)=>{
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

		//修改关键词
		changeSearchKey({commit},value){
			commit("CHANGE_SEARCH_KEY",value)
		},

		//修改分页
		setPageIndex({commit},value){
			commit("CHANGE_TABLE_INDEX",value)
		}


	}
}
