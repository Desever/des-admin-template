import {returnBylocalStorageData} from "./storage";

//获取用户角色
export function getUserRole(){
	var userInfo=returnBylocalStorageData("DES_BOOTSTRAP_INFO");
	if(userInfo){
		return userInfo.role;
	}else{
		return [];
	}
}
//获取token
export function getToken(){
	var userInfo=returnBylocalStorageData("DES_BOOTSTRAP_INFO");
	if(userInfo){
		return userInfo.token;
	}else{
		return "";
	}
}