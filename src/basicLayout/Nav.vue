<template>
	<div class="qy-app-nav">
		<div class="left-compyan-box">
			<img class="qy-logo-img" src="@/assets/images/logo.png"/>
			<i @click="changeCollapse" style="font-size:25px;color:#ffffff;" class="el-icon-menu"></i>
		</div>
		<div class="center-menu-box">
			
			<div class="menu-item active-menu">
				<span>首页</span>
			</div>

			<div v-for="item in historyTopTabMenuList" :key="item.id" class="menu-item">
				<span v-text="item.name"></span>
			</div>
			
			
		</div>
	</div>
</template>

<script>
export default {
	methods:{
		changeCollapse(){
			this.$emit("changeCollapse");
		}
	},

	computed:{
        historyTopTabMenuList(){
            return this.$store.state.app.historyTopTabMenuList;
        }
    }
}
</script>

<style lang="scss" scoped>
.qy-app-nav{
	display:flex;
	width:100%;
	overflow: hidden;
	background:#212844;
	.left-compyan-box{
		padding-top:15px;
		padding-bottom:15px;
		width:240px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.qy-logo-img{
			width:40px;
			height:auto;
			display:block;
			margin-left:20px;
		}
		.qy-menu-button{
			color:#ffffff;
			font-size:30px;
			margin-right:20px;
		}
	}
	.center-menu-box{
		flex:1;
		display:flex;
		margin-left:50px;
		.menu-item{
			margin-top:20px;
			background:none;
			display:flex;
			align-items:flex-end;
			color: #ffffff;
			padding-left:40px;
			padding-right:40px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			span{
				font-size:14px;
				padding-bottom:10px;
				display:block;
			}
		}
		.active-menu{
			background:#ffffff;
			color:#212844;
		}
	}
}
</style>