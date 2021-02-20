<template>
	<div class="public-page">
		<el-page-header @back="goList" content="添加角色"></el-page-header>
		<el-card v-loading="addLoading" style="margin-top:20px">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" style="max-width:60%">
				
				<el-form-item label="角色名称:" prop="name">
					<el-input placeholder="角色名称" v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="角色编码:" prop="code">
					<el-input placeholder="角色编码" v-model="addForm.code"></el-input>
				</el-form-item>
				<el-form-item label="备注:" prop="remark">
					<el-input
					type="textarea"
					:rows="2"
					placeholder="备注"
					 v-model="addForm.remark">
					</el-input>
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
				code:"",
				name:"",
				remark:""
			},
			rules: {
				name: [
					{ required: true, message: '请输入角色名称'}
				],
				code: [
					{ required: true, message: '请输入角色编码'}
				],
				remark: [
					{ required:false, message: '请输入备注'}
				]
			}
		};
	},
	computed:{
		addLoading(){
			return this.$store.state.role.addLoading;
		},
	},
    methods: {
		goList(){
			this.$emit("goList");
		},
		submitForm() {
			this.$refs["addForm"].validate(async (valid) => {
				if (valid) {
					var addRes=await this.$store.dispatch("role/addRole",this.addForm);
					await this.$store.dispatch("role/getList");
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
					}
					
				}
			});
		},
		resetForm() {
			this.$refs["addForm"].resetFields();
		},
		menuTypeChange(){
			this.addForm.parentId="";
		}
    }
}
</script>

<style>

</style>