import AppContainer from "../basicLayout/AppContainer";
export default [
	//渲染主容器，不用修改
	{
		path: '/',
		name: 'AppContainer',
		component: AppContainer,
		redirect: "/home",
		hideMenu:true,
		children:[
			//首页
			{
				path: '/home',
				name: 'Home',
				component:resolve => require(["@/views/home/Home.vue"], resolve)
			},
			//系统管理
			{
				path: '/sys',
				name: 'system_management',
				children:[
					//首页
					{
						path: '/menu',
						name: 'menu_management',
						component:resolve => require(["@/views/sys/menu/menuList.vue"], resolve)
					}
				]
			},

		]
	},

	

	{
		path: '/login',
		name: 'Login',
		hideMenu:true,
		component:resolve => require(["@/views/login/Login.vue"], resolve)
	},
	{
		path: '/404',
		name: '404',
		hideMenu:true,
		component:resolve => require(["@/views/public/404.vue"], resolve)
	}
]