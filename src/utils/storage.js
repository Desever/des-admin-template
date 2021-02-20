const storageBaseKey="DES_QYFR_";
import moment from "moment";
//写入永久缓存
export function saveBylocalStorage(key,data){
	// 补充信息
	var exKey="";
	if(key=="LOCAL_OPTIONAL"){
		exKey=returnBylocalStorageData("DES_BOOTSTRAP_INFO").user_id
	}
    try {
        //写入数据
        localStorage.setItem(`${storageBaseKey}_${key}${exKey}`,JSON.stringify(data));
        //写入时间标记
        localStorage.setItem(`${storageBaseKey}_${key}${exKey}_TIMER`,moment().format("YYYY-MM-DD HH:mm:ss"));
    } catch (error) {
        alert("出现一个缓存错误,请联系管理员"+key);
    }
}

//读取数据写入时间用来判断有效期限
export function returnBylocalStorageTimer(key){
	// 补充信息
	var exKey="";
	if(key=="LOCAL_OPTIONAL"){
		exKey=returnBylocalStorageData("DES_BOOTSTRAP_INFO").user_id
	}
    try {
        var getData=localStorage.getItem(`${storageBaseKey}_${key}${exKey}_TIMER`);
        if(getData){
            return getData;
        }else{
            return null;
        }
    } catch (error) {
        alert("出现一个缓存错误,请联系管理员"+key);
    }
}
//读取永久缓存-数据
export function returnBylocalStorageData(key){
	// 补充信息
	var exKey="";
	if(key=="LOCAL_OPTIONAL"){
		exKey=spaceReturnUserId().user_id
	}
    try {
        var getData=localStorage.getItem(`${storageBaseKey}_${key}${exKey}`);
        if(getData){
            return JSON.parse(getData);
        }else{
            return null;
        }
    } catch (error) {
        alert("出现一个缓存错误,请联系管理员"+key);
    }
}

//写入临时缓存
export function saveBysessionStorage(key,data){
    try {
        //写入数据
        sessionStorage.setItem(`${storageBaseKey}_${key}`,JSON.stringify(data));
        //写入时间标记
        sessionStorage.setItem(`${storageBaseKey}_${key}_TIMER`,moment().format("YYYY-MM-DD HH:mm:ss"));
    } catch (error) {
        alert("出现一个缓存错误,请联系管理员"+key);
    }
}



//读取临时缓存
export function returnBySessionStorage(key){
    try {
        var getData=sessionStorage.getItem(`${storageBaseKey}_${key}`);
        if(getData){
            return JSON.parse(getData);
        }else{
            return null;
        }
    } catch (error) {
		console.error(error);
        alert("出现一个缓存错误,请联系管理员"+key);
    }
}