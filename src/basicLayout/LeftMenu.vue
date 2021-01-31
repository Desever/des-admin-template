<template>
	<div  class="qy-left-menu" :style="{width:isCollapse?'64px':'240px'}">
		<el-menu
			:collapse="isCollapse"
			background-color="#212844"
			text-color="#ffffff"
			default-active="1-1"
			class="qy-el-menu"
		>
			<div v-for="(item,itemIndex) in menuList" :key="item.id">
				<el-submenu v-if="item.children&&item.children.length>0" :index="`${itemIndex}`">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span v-text="item.name"></span>
					</template>
					<el-menu-item-group>
						<el-menu-item @click="goRouter(item)" v-for="(childItem,childItemIndex) in item.children" :key="childItem.id" :index="`${itemIndex}-${childItemIndex}`">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span v-text="childItem.name"></span>
							</template>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item @click="goRouter(item)" v-else :index="`${itemIndex}`">
					<i class="el-icon-document"></i>
					<span slot="title" v-text="item.name"></span>
				</el-menu-item>
			</div>
		</el-menu>
	</div>
</template>

<script>
export default {
	props:["isCollapse"],
	created(){
		this.initMenuList();
	},
	computed:{
        menuList(){
            return this.$store.state.app.menuList;
        }
    },
	methods:{
		//初始化菜单
		initMenuList(){
			this.$store.dispatch("app/getMenuList");
		},
		goRouter(item){
			this.$router.push({
				name:item.code
			});
		}	
	}
}
</script>


<style lang='scss' scope>
.qy-left-menu{
	height:100%;
	background:#212844;
	transition:width 350ms;
	overflow: hidden;
	.qy-el-menu{
		border-right:0px;
	}
}
</style>