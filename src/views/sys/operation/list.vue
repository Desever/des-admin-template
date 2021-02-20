<template>
	<div class="des-menu-box public-page">
		
		<el-card>
			<div slot="header">
				<span>查询条件</span>
			</div>
			<el-form label-width="80px"  style="max-width:60%">
				<el-form-item label="操作名称:">
					<el-input v-model="searchKey" placeholder="操作名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="searchList" type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card style="margin-top:20px">
			<div slot="header" class="clearfix">
				<span>操作列表</span>
				<el-button @click="addHandler" icon="el-icon-plus" style="float: right; padding: 3px 0" type="text">添加操作</el-button>
			</div>
			<el-table
				v-loading="tableLoading"
				:data="tableList"
				stripe
				 row-key="id"
				style="width: 100%">
			

					<el-table-column
					prop="operation_name"
					label="操作名称"
					/>
					<el-table-column
					prop="operation_code"
					label="操作编码"
					/>
					<el-table-column
					prop="intercept_url_prefix"
					label="路径"
					/>

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
					</template>
					</el-table-column>
			</el-table>

			<div style="text-align:center;margin-top:20px;">
				<el-pagination
				@current-change="nextPage"
				background
				:current-page="pageIndex"
				layout="prev, pager, next"
				:total="total">
				</el-pagination>
			</div>
			
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
			return this.$store.state.operation.tableLoading;
		},
		tableList(){
			return this.$store.state.operation.tableList;
		},
		searchKey:{
			get(){
				return this.$store.state.operation.searchKey;
			},
			set(val){
				this.$store.dispatch("operation/changeSearchKey",val);
			}
		},
		total(){
			return this.$store.state.operation.total;
		},
		pageIndex(){
			return this.$store.state.operation.pageIndex;
		}
	},
	methods:{
		addHandler(){
			this.$emit("addHandler");
		},


		//修改
		modifyHandler(item){
			this.$store.dispatch("operation/setActiveItem",item);
			this.$emit("modifyHandler",item);
		},


		//删除
		removeMenuItem(item){
			this.$confirm(`是否删除该操作(${item.operation_name})?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			}).then(() => {
				this.$store.dispatch("operation/remove",item.id).then((res)=>{
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
					this.$store.dispatch("operation/getList");
				})
			});
		},
		
		searchList(){
			this.$store.dispatch("operation/setPageIndex",1);
			this.$store.dispatch("operation/getList");
		},
		nextPage(value){
			this.$store.dispatch("operation/setPageIndex",value);
			this.$store.dispatch("operation/getList");
		}
	},
	created(){
		this.$store.dispatch("operation/getList");
	}
}
</script>

<style>

</style>