<template>
	<div class="des-menu-box public-page">
		
		<el-card>
			<div slot="header">
				<span>查询条件</span>
			</div>
			<el-form label-width="80px"  style="max-width:60%">
				<el-form-item label="角色名称:">
					<el-input v-model="searchKey" placeholder="角色名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="searchList" type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card style="margin-top:20px">
			<div slot="header" class="clearfix">
				<span>角色列表</span>
				<el-button @click="addHandler" icon="el-icon-plus" style="float: right; padding: 3px 0" type="text">添加角色</el-button>
			</div>
			<el-table
				v-loading="tableLoading"
				:data="tableList"
				stripe
				style="width: 100%">
			

					<el-table-column
					prop="name"
					label="角色名称"
					/>
					
					<el-table-column
					prop="code"
					label="code"
					/>
					
				
					<el-table-column
					prop="gmtCreate"
					label="创建时间"/>

					<el-table-column
					prop="gmtUpdate"
					label="修改时间"/>

					<el-table-column
					prop="remark"
					label="备注"/>

					<el-table-column
					fixed="right"
					label="操作"
					width="400">
					<template slot-scope="scope">
						<el-button @click="modifyHandler(scope.row)" size="small" type="success" icon="el-icon-edit">修改</el-button>
						<el-button @click="removeMenuItem(scope.row)" size="small" type="danger" icon="el-icon-delete">删除</el-button>
						<el-button @click="addPowerHandler(scope.row)" size="small" type="warning" icon="el-icon-s-opportunity">添加权限</el-button>
						<el-button @click="removePowerHandler(scope.row)" size="small" type="warning" icon="el-icon-s-opportunity">移除权限</el-button>
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
			return this.$store.state.role.tableLoading;
		},
		tableList(){
			return this.$store.state.role.tableList;
		},
		searchKey:{
			get(){
				return this.$store.state.role.searchKey;
			},
			set(val){
				this.$store.dispatch("role/changeSearchKey",val);
			}
		}
	},
	methods:{
		addHandler(){
			this.$emit("addHandler");
		},

		addPowerHandler(item){
			this.$store.dispatch("role/setActiveItem",item);
			this.$emit("addPowerHandler");
		},

		removePowerHandler(item){
			this.$store.dispatch("role/setActiveItem",item);
			this.$emit("removePowerHandler");
		},

		//修改
		modifyHandler(item){
			this.$store.dispatch("role/setActiveItem",item);
			this.$emit("modifyHandler",item);
		},


		//删除
		removeMenuItem(item){
			this.$confirm(`是否删除该角色(${item.name})?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			}).then(() => {
				this.$store.dispatch("role/remove",item.id).then((res)=>{
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
							type:"error"
						});
					}
					this.$store.dispatch("role/getList");
				})
			});
		},
		searchList(){
			this.$store.dispatch("role/getList");
		}
	},
	created(){
		this.$store.dispatch("role/getList");
	}
}
</script>

<style>

</style>