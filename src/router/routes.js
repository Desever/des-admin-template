import AppContainer from "../basicLayout/AppContainer";
import error404 from "@/views/public/404.vue";
import error403 from "@/views/public/403.vue";
export default [
	//渲染主容器，不用修改
	{
		path: '/',
		name: 'appContainer',
		component: AppContainer,
		redirect: "home",
		hideMenu:true,
		children:[
			//首页
			{
				path: 'home',
				name: 'home',
				component:resolve => require(["@/views/home/home.vue"], resolve)
			}
		]
	},


	{
		path: '/sys',
		name: 'sys_management',
		component: AppContainer,
		meta:{
			title:"系统管理",
		},
		children:[
			{
				path: 'menu',
				name: 'menu_management',
				meta:{
					title:"菜单管理",
				},
				component:resolve => require(["@/views/sys/menu/index.vue"], resolve)
			},
			{
				path: 'org',
				name: 'org_management',
				meta:{
					title:"机构管理",
				},
				component:resolve => require(["@/views/sys/org/index.vue"], resolve)
			},
			{
				path: 'role',
				meta:{
					title:"角色管理",
				},
				name: 'role_management',
				component:resolve => require(["@/views/sys/role/index.vue"], resolve)
			},
			{
				path: 'operation',
				meta:{
					title:"操作管理",
				},
				name: 'operation_management',
				component:resolve => require(["@/views/sys/operation/index.vue"], resolve)
			},
			{
				path: 'user',
				meta:{
					title:"用户管理",
				},
				name: 'user_management',
				component:resolve => require(["@/views/sys/user/index.vue"], resolve)
			}
		]
	},



	//登录
	{
		path: '/login',
		name: 'login',
		hideMenu:true,
		component:resolve => require(["@/views/login/login.vue"], resolve)
	},
	{
		path: '/404',
		name: '404',
		hideMenu:true,
		component:error404
	},
	{
		path: '/403',
		name: '403',
		hideMenu:true,
		component:error403
	}
]