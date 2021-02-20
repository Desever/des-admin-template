import routes from "../router/routes";
import {returnBySessionStorage} from "../utils/storage";
export default class routerAuth{

	//本地配置
	routerArray=[];


	//不需要验证的路由
	notChckRouter=[
		"home",
		"login",
		"404",
		"403"
	];

	constructor(){
		this.initRouterArray(routes);
	}

	static getRouterTree(){
		return routes;
	}

	initRouterArray(routesData){
		for(var i=0;i<routesData.length;i++){
			this.routerArray.push(routesData[i]);
			if (routesData[i].children&&routesData[i].children.length>0) {
				this.initRouterArray(routesData[i].children);
			}
		}
	}

	//403
	checkNotAuth(toName){

		console.log(toName);

		var returnValue=false;
		if(this.notChckRouter.indexOf(toName)>-1){
			returnValue=true;
		}else{
			var serviceMenuStr=returnBySessionStorage("ROLE_MENU_LIST");
			if(!this.serviceMenuStr){
				var localMenuArray=JSON.parse(serviceMenuStr);
				for(var i=0;i<localMenuArray.length;i++){
					if(localMenuArray[i]["children"]&&localMenuArray[i]["children"].length>0){
						for(var j=0;j<localMenuArray[i]["children"].length;j++){
							if(localMenuArray[i]["children"][j]["code"]==toName){
								returnValue=true;
							}
						}
					}
				}
			}
		}
		return returnValue;
	}
	
	//404
	checkNotPage(toName){
		var returnValue=false;
		for(var i=0;i<this.routerArray.length;i++){
			if(toName==this.routerArray[i]["name"]){
				returnValue=true;
				break;
			}
		}
		return returnValue;
	}
}
