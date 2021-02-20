<template>
	<div class="qy-app-nav">
		
		<div class="center-menu-box">
			<div @click="goHome" class="menu-item" :class="!activeHistoryTabItem?'active-menu':''">
				<div class="menu-item-text">
					<span>首页</span>
				</div>
			</div>
			<div v-for="item in historyTopTabMenuList" :key="item.id" class="menu-item" :class="(!!activeHistoryTabItem&&item.code==activeHistoryTabItem.code)?'active-menu':''">
				<div class="menu-item-text" @click="goHisRouter(item)">
					<span v-text="item.name" ></span>
				</div>
				<div class="menu-close" @click="closeTab(item)">
					<i class="el-icon-circle-close"></i>
				</div>
			</div>
		</div>

		<div class="right-content">
			<el-badge :value="200" :max="10">
				<i class="el-icon-message-solid message"></i>
			</el-badge>
			<el-dropdown @command="handleCommand" class="user-face">
				<el-avatar :size="30" :src="''"></el-avatar>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
					<el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			
		</div>


	</div>
</template>

<script>
export default {
	methods:{
		handleCommand(command) {
			if(command=="loginOut"){
				this.$router.replace({
					name:"login"
				});
			}
		},
		goHome(){
			this.$router.replace({
				name:"home"
			});
			this.$store.dispatch("app/addHistoryTopTabMenu",null);
		},
		goHisRouter(item){
			this.$router.replace({
				name:item.code
			});
			this.$store.dispatch("app/addHistoryTopTabMenu",item);
		},
		closeTab(item){
			//如果关闭的是其他界面，路由不做操作
			this.$store.dispatch("app/closeHistoryTOpMenu",item);
			if(this.activeHistoryTabItem){
				if(item.code!=this.activeHistoryTabItem.code){
					this.$router.replace({
						name:this.activeHistoryTabItem.code
					});
				}
			}else{
				this.$router.replace({
					name:"home"
				});
			}

		}
	},
	computed:{
        historyTopTabMenuList(){
            return this.$store.state.app.historyTopTabMenuList;
		},
		activeHistoryTabItem(){
			return this.$store.state.app.activeHistoryTabItem;
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
	box-shadow:0px 5px 15px rgba(0,0,0,0.56);
	position: relative;
	z-index:100;
	align-items: center;
	.right-content{
		padding-right:10px;
		color: #ffffff;
		display:flex;
		align-items: center;
		.user-face{
			margin-left:30px;
		}
		.message{
			font-size:30px;
		}
	}
	.center-menu-box{
		flex:1;
		display:flex;
		margin-left:50px;
		.menu-item{
			position: relative;
			margin-top:10px;
			display:flex;
			.menu-close{
				position:absolute;
				right:20px;
				bottom:15px;
				z-index:100;
				color:#ffffff;
				cursor: pointer;
			}
			.menu-item-text{
				flex:1;
				background:none;
				display:flex;
				align-items:flex-end;
				color: #ffffff;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				transition:all 350ms;
				cursor: pointer;
				padding-top:20px;
				padding-bottom:15px;
				span{
					padding-left:40px;
					padding-right:40px;
					font-size:14px;
					display:block;
					
				}
			}
			
			
		}
		.active-menu{
			.menu-close{
				color:#212844;
			}
			.menu-item-text{
				background:#ffffff;
				span{
					color:#212844;
				}
			}
		}
	}
}
</style>