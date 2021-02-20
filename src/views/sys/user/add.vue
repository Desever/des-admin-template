<template>
	<div class="public-page">
		<el-page-header @back="goList" content="添加用户"></el-page-header>
		<el-card v-loading="addLoading" style="margin-top:20px">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" style="max-width:60%">
				
				
				<el-form-item label="操作编码:" prop="operationCode">
					<el-input placeholder="操作编码" v-model="addForm.operationCode"></el-input>
				</el-form-item>
				<el-form-item label="操作名称:" prop="operationName">
					<el-input placeholder="操作名称" v-model="addForm.operationName"></el-input>
				</el-form-item>
				<el-form-item label="操作路径:" prop="interceptUrlPrefix">
					<el-input placeholder="操作路径" v-model="addForm.interceptUrlPrefix"></el-input>
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
			addForm: {
				interceptUrlPrefix: "",
				operationCode: "",
				operationName: ""
			},
			rules: {
				interceptUrlPrefix: [
					{ required: true, message: '请选择菜单类型'}
				],
				operationCode: [
					{ required: true, message: '请输入菜单名称'}
				],
				operationName: [
					{ required: true, message: '请输入菜单code'}
				]
			}
		};
	},
	computed:{
		addLoading(){
			return this.$store.state.operation.addLoading;
		}
	},
    methods: {
		goList(){
			this.$emit("goList");
		},
		
		submitForm() {
			this.$refs["addForm"].validate(async (valid) => {
				if (valid) {
					var addRes=await this.$store.dispatch("operation/add",this.addForm);
					await this.$store.dispatch("operation/getList");
					if(addRes.state==1){
						this.$confirm(`添加成功，是否继续添加?`, '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'success'
						}).then(() => {
							this.resetForm();
						}).catch(()=>{
							this.goList();
						});
					}else{
						this.$notify({
							title: '提示',
							message:addRes.msg,
							type: 'error'
						});
					}
					
					
				}
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