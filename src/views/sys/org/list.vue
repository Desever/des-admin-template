<template>
	<div class="des-menu-box public-page">
		
		<el-card style="margin-top:20px" v-loading="tableLoading">
			<div slot="header" class="clearfix">
				<span>机构列表</span>
				<el-button @click="addHandler" icon="el-icon-plus" style="float: right; padding: 3px 0" type="text">添加机构</el-button>
			</div>
			<orgTreeChart></orgTreeChart>
		</el-card>

		<el-card style="margin-top:20px" v-loading="tableLoading">
			<el-table
				:data="activeItemArray"
				stripe
				style="width: 100%">

					<el-table-column
					prop="name"
					label="机构名称"
					/>
					<el-table-column
					prop="code"
					label="机构编码"
					/>
					<el-table-column
					prop="address"
					label="机构地址"
					/>

					<el-table-column
					fixed="right"
					label="操作"
					width="300">
					<template slot-scope="scope">
						<el-button @click="modify(scope.row)" size="small" type="success" icon="el-icon-edit">修改</el-button>
						<el-button @click="remove(scope.row)" size="small" type="danger" icon="el-icon-delete">删除</el-button>
					</template>
					</el-table-column>

			</el-table>

		</el-card>

		
	</div>
</template>

<script>
import orgTreeChart from "../../../components/org/orgTreeChart";
export default {
	components:{
		orgTreeChart
	},
	data(){
		return {
		}
	},
	computed:{
		tableLoading(){
			return this.$store.state.org.tableLoading;
		},
		tableList(){
			return this.$store.state.org.tableList;
		},
		activeItemArray(){
			if(this.$store.state.org.activeItem){
				return [this.$store.state.org.activeItem];
			}else{

				if(this.tableList.length>0){
					return [this.tableList[0]];
				}else{
					return [];
				}

			}
		}
	},
	methods:{
		addHandler(){
			this.$emit("addHandler");
		},

		//修改
		modify(item){
			this.$store.dispatch("org/setActiveItem",item);
			this.$emit("modifyHandler",item);
		},


		//删除
		remove(item){
			this.$confirm(`是否删除该机构(${item.name})?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			}).then(() => {
				this.$store.dispatch("org/remove",item.id).then((res)=>{
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
					this.$store.dispatch("org/getList");
				})
			});
		}
	},
	created(){
		this.$store.dispatch("org/getList");
	}
}
</script>

<style>

</style>