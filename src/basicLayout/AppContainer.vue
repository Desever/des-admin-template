<template>
	<div class="qy-app-container">
		<Nav @changeCollapse="changeCollapse"></Nav>
		<div class="qy-center-render">
			<LeftMenu :isCollapse="isCollapse"></LeftMenu>
			<RightRouterView></RightRouterView>
		</div>
	</div>
</template>

<script>
import Nav from "./Nav";
//侧边栏目
import LeftMenu from "./LeftMenu";
//右边路由容器
import RightRouterView from "./RightRouterView";
export default {
	data(){
		return {
			isCollapse:false,
		}
	},
	components:{
		LeftMenu,
		Nav,
		RightRouterView
	},
	methods:{
		changeCollapse(){
			this.isCollapse=!this.isCollapse;
		}
	}
}
</script>

<style lang='scss' scope>
.qy-app-container{
	width:100%;
	height:100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.qy-center-render{
		flex:1;
		overflow: hidden;
		display:flex;
	}
}
</style>