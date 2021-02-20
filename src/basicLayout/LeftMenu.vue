<template>
	<div  class="qy-left-menu" :style="{width:isCollapse?'64px':'240px'}">
		
		<div class="top-compyan-box" :class="isCollapse?'top-compyan-cener':''">
			<img class="qy-logo-img" src="@/assets/images/logo.png"/>
			<i @click="changeCollapse" style="font-size:25px;color:#ffffff;" class="el-icon-menu"></i>
		</div>
		
		<el-menu
			:collapse="isCollapse"
			background-color="#212844"
			text-color="#ffffff"
			active-text-color="#409EFF"
			:default-active="activeHistoryTabItem?activeHistoryTabItem.activeIndex:''"
			class="qy-el-menu"
			
		>
			<el-submenu v-for="(item,itemIndex) in menuList" :key="item.id" :index="`${itemIndex}`">
				
				<template slot="title">
					<i :class="item.icon"></i>
					<span slot="title" v-text="item.name"></span>
				</template>

				<el-menu-item-group>
					<el-menu-item @click="goRouter(childItem,`${itemIndex}-${childItemIndex}`)" v-for="(childItem,childItemIndex) in item.children" :key="childItem.id" :index="`${itemIndex}-${childItemIndex}`">
						<template slot="title">
							<i :class="childItem.icon"></i>
							<span slot="title" v-text="childItem.name"></span>
						</template>
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
	data(){
		return {
			isCollapse:false
		}
	},
	computed:{
        menuList(){
            return this.$store.state.app.menuList;
		},
		activeHistoryTabItem(){
			return this.$store.state.app.activeHistoryTabItem;
		},
    },
	methods:{
		changeCollapse(){
			this.isCollapse=!this.isCollapse;
		},
		goRouter(item,activeIndex){
			this.$router.replace({
				name:item.code
			});
			this.$store.dispatch("app/addHistoryTopTabMenu",{
				...item,
				activeIndex:activeIndex
			})
		}	
	}
}
</script>


<style lang='scss' scope>
.qy-left-menu{
	height:100%;
	background:#212844;
	overflow: hidden;
	.top-compyan-box{
		width:100%;
		display: flex;
		align-items: center;
		justify-content:space-between;
		height:55px;
		margin-top:10px;
		overflow: hidden;
		.qy-logo-img{
			width:40px;
			height:40px;
			height:auto;
			display:block;
			margin-left:20px;
		}
		.qy-menu-button{
			color:#ffffff;
			font-size:30px;
		}
	}
	.top-compyan-cener{
		justify-content:center;
		.qy-logo-img{
			display:none;
		}
	}
	.qy-el-menu{
		border-right:0px;
	}
}
</style>