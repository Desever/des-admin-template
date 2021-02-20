<template>
	<div class="public-page">
		<el-page-header @back="goList" :content="'添加权限-'+activeItem.name"></el-page-header>
		<el-card style="margin-top:20px">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" style="max-width:60%">
				
				<el-form-item label="权限类型:"  prop="menuType">
					<el-radio-group @change="permissionTypeChange" v-model="addForm.permissionType">
						<el-radio label="operation">按钮</el-radio>
						<el-radio label="menu">菜单</el-radio>
						<el-radio label="file">文件</el-radio>
					</el-radio-group>
				</el-form-item>


				<el-form-item v-loading="addLoading" label="权限类型:"  prop="permissionIds">
					<el-transfer
						:titles="['未添加权限','待添加权限']"
						filterable
						:filter-method="filterMethod"
						filter-placeholder="请输入关键词查询"
						v-model="addForm.permissionIds"
						:data="permissionList">
					</el-transfer>
				</el-form-item>

			
				<el-form-item>
					<el-button @click="submitForm" type="primary">保存</el-button>
				</el-form-item>

			</el-form>
		</el-card>
		
	</div>
</template>

<script>
export default {
    data() {
		
		return {
			permissionList:[],
			filterMethod(query, item) {
				return item.label.indexOf(query) > -1;
			},
			addForm: {
				permissionType:"operation",
				permissionIds: [],
				roleId:""
			},
			rules: {
				permissionType: [
					{ required: true, message: '请选择权限类型'}
				],
				permissionIds: [
					{ required: true, message: '请选择权限'}
				]
			}
		};
	},
	computed:{
		addLoading(){
			return this.$store.state.role.addLoading;
		},
		activeItem(){
			return this.$store.state.role.activeItem;
		}
	},
	created(){
		this.$store.dispatch("role/changeAddloading",true);
		this.$store.dispatch("role/getNotAddList",{
			roleId:this.activeItem.id,
			type:this.addForm.permissionType
		}).then((res)=>{
			this.permissionList=res.data;
			this.$store.dispatch("role/changeAddloading",false);
		});
	},
    methods: {
		goList(){
			this.$emit("goList");
		},
		submitForm() {
			this.$refs["addForm"].validate(async (valid) => {
				if (valid) {
					this.$confirm(`确认修改改角色权限?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$store.dispatch("role/changeAddloading",true);
						this.addForm.roleId = this.activeItem.id;
						this.$store.dispatch("role/permissionEmpower",this.addForm).then((res)=>{
							this.$store.dispatch("role/changeAddloading",false);
							if(res.state==1){
								this.$notify({
									title: '提示',
									message:res.msg,
									type: 'success'
								});
								this.goList();
							}else{
								this.$notify({
									title: '提示',
									message:res.msg,
									type: 'error'
								});
							}
						})
					})
				}
			});
		},
		permissionTypeChange(){
			this.$store.dispatch("role/changeAddloading",true);
			this.$store.dispatch("role/getNotAddList",{
				roleId:this.activeItem.id,
				type:this.addForm.permissionType
			}).then((res)=>{
				this.permissionList=res.data;
				this.$store.dispatch("role/changeAddloading",false);
			});
		},
		resetForm() {
			this.$refs["addForm"].resetFields();
		}
    }
}
</script>

<style>

</style>