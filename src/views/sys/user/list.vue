<template>
	<div class="des-menu-box public-page">
		
		<el-card>
			<div slot="header">
				<span>查询条件</span>
			</div>
			<el-form label-width="80px"  style="max-width:60%">
				<el-form-item label="用户名:">
					<el-input v-model="name" placeholder="用户名"></el-input>
				</el-form-item>

				<el-form-item label="时间段:">
					<el-date-picker
					
					style="width:100%"
					v-model="searchTimer"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="角色:">
					<el-select style="width:100%" v-model="role" placeholder="请选择">
						<el-option
						v-for="item in allRole"
						:key="item.id"
						:label="item.name"
						:value="item.code">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button @click="searchList" type="primary">查询</el-button>
				</el-form-item>
				
			</el-form>
		</el-card>


		<el-card style="margin-top:20px">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
				<el-button @click="addHandler" icon="el-icon-plus" style="float: right; padding: 3px 0" type="text">添加用户</el-button>
			</div>
			<el-table
				v-loading="tableLoading"
				:data="tableList"
				stripe
				 row-key="id"
				style="width: 100%">
			

					<el-table-column
					prop="name"
					label="用户名"
					/>
					<el-table-column
					prop="phone"
					label="手机号"
					/>

				
					<el-table-column
					prop="orgName"
					label="所属机构"
					/>


					<el-table-column
					prop="roleNames"
					label="角色"
					/>

					<el-table-column
					prop="roleCodes"
					label="角色编码"/>

					<el-table-column
					prop="gmtCreate"
					label="创建时间"/>

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
import moment from "moment";
export default {
	data(){
		return {
		}
	},
	computed:{
		tableLoading(){
			return this.$store.state.user.tableLoading;
		},
		tableList(){
			return this.$store.state.user.tableList;
		},
		allRole(){
			return this.$store.state.user.allRole;
		},
		name:{
			get(){
				return this.$store.state.user.name;
			},
			set(val){
				this.$store.dispatch("user/setSearchData",{
					data:val,
					changeKey:"name"
				});
			}
		},
		role:{
			get(){
				return this.$store.state.user.role;
			},
			set(val){
				this.$store.dispatch("user/setSearchData",{
					data:val,
					changeKey:"role"
				});
			}
		},
		searchTimer:{
			get(){
				return this.$store.state.user.searchTimer;
			},
			set(val){
				if(val){
					this.$store.dispatch("user/setSearchData",{
						data:[moment(val[0]).format("YYYY-MM-DD"),moment(val[1]).format("YYYY-MM-DD")],
						changeKey:"searchTimer"
					});
				}else{
					this.$store.dispatch("user/setSearchData",{
						data:["",""],
						changeKey:"searchTimer"
					});
				}
				
			}
		},
		total(){
			return this.$store.state.user.total;
		},
		pageIndex(){
			return this.$store.state.user.pageIndex;
		}
	},
	methods:{
		addHandler(){
			this.$emit("addHandler");
		},


		//修改
		modifyHandler(item){
			this.$store.dispatch("user/setActiveItem",item);
			this.$emit("modifyHandler",item);
		},


		//删除
		removeMenuItem(item){
			this.$confirm(`是否删除该操作(${item.operation_name})?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			}).then(() => {
				this.$store.dispatch("user/remove",item.id).then((res)=>{
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
					this.$store.dispatch("user/getList");
				})
			});
		},
		
		searchList(){
			this.$store.dispatch("user/setPageIndex",1);
			this.$store.dispatch("user/getList");
		},
		nextPage(value){
			this.$store.dispatch("user/setPageIndex",value);
			this.$store.dispatch("user/getList");
		}
	},
	created(){
		this.$store.dispatch("user/getList");
		this.$store.dispatch("user/getRoleList");
		
	}
}
</script>

<style>

</style>