<template>
	<div class="qy-app-container" v-loading="menuLoading">
		<LeftMenu v-if="!menuLoading"></LeftMenu>
		<div v-if="!menuLoading" class="qy-center-render">
			<Nav></Nav>
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
	components:{
		LeftMenu,
		Nav,
		RightRouterView
	},
	computed:{
		menuLoading(){
			return this.$store.state.app.menuLoading;
		}
	},
	created(){
		this.$store.dispatch("app/getMenuList");
	}
}
</script>

<style lang='scss' scope>
.qy-app-container{
	width:100%;
	height:100%;
	overflow: hidden;
	display: flex;
	.qy-center-render{
		flex:1;
		overflow: hidden;
		display:flex;
		flex-direction:column;
	}
}
</style>