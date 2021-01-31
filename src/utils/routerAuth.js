import routes from "../router/routes";
export default class routerAuth{

	routerArray=[];


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
