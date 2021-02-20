<template>
	<div class="des-menu-box public-page">
		
		<el-card>
			<div slot="header">
				<span>查询条件</span>
			</div>
			<el-form label-width="80px"  style="max-width:60%">
				<el-form-item label="菜单名称:">
					<el-input v-model="searchKey" placeholder="菜单名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="searchList" type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card style="margin-top:20px">
			<div slot="header" class="clearfix">
				<span>菜单列表</span>
				<el-button @click="addHandler" icon="el-icon-plus" style="float: right; padding: 3px 0" type="text">添加菜单</el-button>
			</div>
			<el-table
				v-loading="tableLoading"
				:data="tableList"
				stripe
				 row-key="id"
				style="width: 100%">
			

					<el-table-column
					prop="name"
					label="菜单名称"
					/>
					<el-table-column
					prop="code"
					label="code"
					/>
					<el-table-column
					prop="url"
					label="路径"
					/>
					<el-table-column
					prop="code"
					label="状态"
					>
					<template slot-scope="scope">
						<el-tag size="mini" v-if="scope.row.status==1">已启用</el-tag>
						<el-tag type="danger" size="mini" v-if="scope.row.status!=1">已禁用</el-tag>
					</template>
					</el-table-column>

					<el-table-column
					prop="gmtCreate"
					label="创建时间"/>

					<el-table-column
					prop="gmtUpdate"
					label="修改时间"/>

					<el-table-column
					fixed="right"
					label="操作"
					width="300">
					<template slot-scope="scope">
						<el-button @click="modifyHandler(scope.row)" size="small" type="success" icon="el-icon-edit">修改</el-button>
						<el-button @click="removeMenuItem(scope.row)" size="small" type="danger" icon="el-icon-delete">删除</el-button>
						<el-button @click="enableMenu(scope.row)" v-if="scope.row.status!=1" size="small" type="primary" icon="el-icon-s-opportunity">启用</el-button>
						<el-button @click="disableMenu(scope.row)" v-if="scope.row.status==1" size="small" type="warning" icon="el-icon-s-opportunity">禁用</el-button>
					</template>
					</el-table-column>
			</el-table>
			
		</el-card>

	</div>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	computed:{
		tableLoading(){
			return this.$store.state.menu.tableLoading;
		},
		tableList(){
			return this.$store.state.menu.tableList;
		},
		searchKey:{
			get(){
				return this.$store.state.menu.searchKey;
			},
			set(val){
				this.$store.dispatch("menu/changeSearchKey",val);
			}
		}
	},
	methods:{
		addHandler(){
			this.$emit("addHandler");
		},


		//修改
		modifyHandler(item){
			this.$store.dispatch("menu/setActiveItem",item);
			this.$emit("modifyHandler",item);
		},

		//启用菜单
		enableMenu(item){
			this.$store.dispatch("menu/setActiveItem",item);
			this.$confirm(`是否启用该菜单(${item.name})?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("menu/enable").then((res)=>{
					if(res.state==1){
						this.$notify({
							title: '提示',
							message:res.msg,
							type: 'success'
						});
					}else{
						this.$notify({
							title: '提示',
							message:res.msg,
							type: 'error'
						});
					}
					this.$store.dispatch("menu/getList");
				})
			});
		},
		//禁用菜单
		disableMenu(item){
			this.$store.dispatch("menu/setActiveItem",item);
			this.$confirm(`是否禁用该菜单(${item.name})?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("menu/disable").then((res)=>{
					if(res.state==1){
						this.$notify({
							title: '提示',
							message:res.msg,
							type: 'success'
						});
					}else{
						this.$notify({
							title: '提示',
							message:res.msg,
							type: 'error'
						});
					}
					this.$store.dispatch("menu/getList");
				})
			});
		},

		//删除菜单
		removeMenuItem(item){
			this.$confirm(`是否删除该菜单(${item.name})?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			}).then(() => {
				this.$store.dispatch("menu/remove",item.id).then((res)=>{
					if(res.state==1){
						this.$notify({
							title: '提示',
							message:res.msg,
							type: 'success'
						});
					}else{
						this.$notify({
							title: '提示',
							message:res.msg,
							type: 'error'
						});
					}
					this.$store.dispatch("menu/getList");
				})
			});
		},
		searchList(){
			this.$store.dispatch("menu/getList");
		}
	},
	created(){
		this.$store.dispatch("menu/getList");
	}
}
</script>

<style>

</style>