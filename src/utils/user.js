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

//获取用户当前机构
export function getUserOrg(){
	var userInfo=returnBylocalStorageData("DES_BOOTSTRAP_INFO");
	if(userInfo){
		return userInfo.org;
	}else{
		return null;
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