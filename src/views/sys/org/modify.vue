<template>
	<div class="public-page">
		<el-page-header @back="goList" :content="'修改机构-'+activeItem.name"></el-page-header>
		<el-card v-loading="addLoading" style="margin-top:20px">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" style="max-width:60%">
				
				
				<el-form-item label="所属机构:" prop="parentIdView">
					<el-cascader
					style="width:100%"
					v-model="addForm.parentIdView"
					:options="tableList"
					:props="{ 
						checkStrictly:true,
						value:'id',
						label:'name'
					}"
					clearable></el-cascader>
				</el-form-item>
				
				
		
				<el-form-item label="机构名称:" prop="name">
					<el-input placeholder="机构名称" v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="机构编码:" prop="code">
					<el-input placeholder="机构编码" v-model="addForm.code"></el-input>
				</el-form-item>

				<el-form-item label="机构地址:" prop="address">
					<el-input placeholder="机构地址" v-model="addForm.address"></el-input>
				</el-form-item>

				<el-form-item label="联系方式:" prop="phone">
					<el-input placeholder="联系方式" v-model="addForm.phone"></el-input>
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
				address: "",
				code: "",
				name: "",
				parentIdView:"",
				parentId:"",
				phone: "",
				remark: "",
				state:"",
			},
			rules: {
				address: [
					{ required: true, message: '请输入机构地址'}
				],
				code: [
					{ required: true, message: '请输入机构编码'}
				],
				name: [
					{ required: true, message: '请输入机构名称'}
				],
				parentIdView: [
					{ required: true, message: '请选择所属机构'}
				],
				phone: [
					{ required: true, message: '请输入联系方式'}
				],
				state: [
					{ required: true, message: '请选择机构状态'}
				]
			}
		};
	},
	computed:{
		addLoading(){
			return this.$store.state.org.addLoading;
		},
		tableList(){
			return this.$store.state.org.tableList;
		},
		activeItem(){
			return this.$store.state.org.activeItem;
		}
	},
	created(){
		for(var i in this.addForm){
			this.addForm[i]=this.activeItem[i];
		}
		this.addForm["parentIdView"]=this.activeItem["parentId"];
	},
    methods: {
		goList(){
			this.$emit("goList");
		},
		submitForm() {
			this.$refs["addForm"].validate(async (valid) => {
				if (valid) {
					this.addForm["parentId"] =this.addForm["parentIdView"][this.addForm["parentIdView"].length-1];
					var addRes=await this.$store.dispatch("org/modify",this.addForm);
					this.$store.dispatch("org/getList");
					if(addRes.state==1){
						this.$notify({
							title: '提示',
							message:addRes.msg,
							type: 'success'
						});
						this.goList();
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