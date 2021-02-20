<template>
	<div class="public-page">
		<el-page-header @back="goList" content="修改菜单"></el-page-header>
		<el-card v-loading="addLoading" style="margin-top:20px">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" style="max-width:60%">
				
				<el-form-item label="菜单类型:" prop="menuType">
					<el-radio-group @change="menuTypeChange" v-model="addForm.menuType">
						<el-radio :label="1">父菜单</el-radio>
						<el-radio :label="2">子菜单</el-radio>
					</el-radio-group>
				</el-form-item>


				<!-- 如果是子菜单要选择父菜单 -->
				<el-form-item v-if="addForm.menuType==2" label="父菜单:" prop="menuType">
					<el-select style="width:100%;" v-model="addForm.parentId" filterable placeholder="请选择父菜单">
						<el-option
						v-for="item in parentMenuList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<!-- 如果是子菜单要选择父菜单 -->


				<el-form-item label="菜单code:" prop="code">
					<el-input placeholder="菜单code" v-model="addForm.code"></el-input>
				</el-form-item>
				<el-form-item label="菜单名称:" prop="name">
					<el-input placeholder="菜单名称" v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="菜单路径:" prop="url">
					<el-input placeholder="菜单路径" v-model="addForm.url"></el-input>
				</el-form-item>
				<el-form-item label="菜单图标:" prop="icon">
					<el-input  placeholder="菜单图标" v-model="addForm.icon"></el-input>
				</el-form-item>
				<el-form-item label="排序:" prop="sort">
					<el-input  placeholder="排序" v-model="addForm.sort"></el-input>
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
				menuType:"",
				code: "",
				icon: "",
				name: "",
				parentId:"",
				sort:"",
				status:"",
				url: ""
			},
			rules: {
				menuType: [
					{ required: true, message: '请选择菜单类型'}
				],
				name: [
					{ required: true, message: '请输入菜单名称'}
				],
				code: [
					{ required: true, message: '请输入菜单code'}
				],
				icon: [
					{ required: true, message: '请输入菜单图标'}
				],
				url:[
					{ required: true, message: '请输入菜单路径'}
				]
			}
		};
	},
	computed:{
		addLoading(){
			return this.$store.state.menu.addLoading;
		},
		activeItem(){
			return this.$store.state.menu.activeItem;
		},
		parentMenuList(){
			return this.$store.state.menu.tableList;
		}
	},
	created(){
		for(var i in this.addForm){
			this.addForm[i]=this.activeItem[i];
		}
		//判断子菜单还是父菜单
		if(this.activeItem.parentId==0){
			this.addForm["menuType"]=1;
		}else{
			this.addForm["menuType"]=2;
		}
	},
    methods: {
		goList(){
			this.$emit("goList");
		},
		submitForm() {
			this.$refs["addForm"].validate(async (valid) => {
				if (valid) {

					//如果是父菜单parentId为0
					if(this.addForm.menuType==1){
						this.activeItem.parentId=0;
					}
					var addRes=await this.$store.dispatch("menu/modify",this.addForm);
					this.$store.dispatch("menu/getList");
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
		},
		menuTypeChange(){
			this.addForm.parentId="";
		}
    }
}
</script>

<style>

</style>