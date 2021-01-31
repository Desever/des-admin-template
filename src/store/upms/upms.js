import {getData,postData,putData} from "../../utils/http";
import {
    saveBylocalStorage,
	returnBylocalStorageData,
	returnBySessionStorage
} from "../../utils/storage";

export default {
	namespaced:true,
	state: {
        //用户登录标识
        userLoginState:"",
        //信息
        userName: "",
	},
	mutations: {
        //写入用户登录数据
        SET_USER_LOGIN_INFO(state,data){
            saveBylocalStorage("DES_BOOTSTRAP_INFO",data);
            saveBylocalStorage("DES_BOOTSTRAP_STATE","bootstrap");
            state.userLoginState="bootstrap";
        },
        //退出登录
        LOGINOUT(state){
            saveBylocalStorage("DES_BOOTSTRAP_INFO","");
            saveBylocalStorage("DES_BOOTSTRAP_STATE","");
			state.userLoginState="";
			
			//信息
			state.userName="";
			state.idNumber="";
			state.userAvatar="";
			state.realName="";
			state.realNameState=null;
			state.bankCardState=null;
			state.weChatState=null;
			state.orgName="";
			state.orgPhone="";
			state.orgPosition="";
			state.investmentAccount=null;
			state.tradeAccount=null;
			state.userAvatar=userAvatar;
			state.nickname="";

        },
        //刷新登陆状态
        RELOAD_LOGIN_STATE(state){
            state.userLoginState=returnBylocalStorageData("DES_BOOTSTRAP_STATE");
        }
	},
	actions: { 
        //登陆
        userLogin({commit},loginData){
            return new Promise((resolve)=>{
				//登录
                postData("auth/login",loginData).then((res)=>{
                    if(res.state==1){
                        commit("SET_USER_LOGIN_INFO",res.data);
                        resolve({
                            state:1,
                            msg:"登录成功"
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
        
        //退出登录
        loginOut({commit}){
			return new Promise((resolve)=>{
				var loginInfo=returnBylocalStorageData("DES_BOOTSTRAP_INFO");
				if(loginInfo&&loginInfo.access_token){
					postData("upms/logout?accessToken="+loginInfo.access_token).then((res)=>{
						commit("LOGINOUT");
						if(res.state==1){
							resolve({
								state:1,
								msg:"退出成功"
							});
						}else{
							resolve({
								state:0,
								msg:res.msg
							});
						}
					})
				}else{
					resolve({
						state:1,
						msg:"退出成功"
					});
				}
            })
            
        },


        //刷新登陆状态
        reloadLoginState({commit}){
            commit("RELOAD_LOGIN_STATE");
        }
	}
}
