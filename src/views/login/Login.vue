<style lang="scss">
@import "./login.scss";
@import "/assets/style/animate.min.css";
</style>

<template>
  <div :class="loginClass">
    <div class="modal"></div>

    <div class="login-box">
        <el-form ref="loginForm" :model="loginData" style="width:100%;">
            <div style="padding-bottom:20px;padding-top:60px;">
                <span style="padding-left:30px;font-size:16px;">账号登录</span>
            </div>
            <div style="padding-left:30px;padding-right:10px;">
               <el-form-item 
			   prop="username"
			   :rules="[
					{ required: true, message: '请输入用户名'},
			   ]" label="用户名">
					<el-input v-model="loginData.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item 
				prop="password"
				:rules="[
					{ required: true, message: '请输入密码'},
			  	]"
				label="密码">
					<el-input v-model="loginData.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-button round type="primary" @click="handleLoginSubmit">登录</el-button>
            </div>
        </el-form>
    </div>
    <div class="loading-login">
        <div class="loading-login-info animated fadeInLeft">
            <lottie :options="defaultOptions" :height="100" :width="200" />
            <span>登录中</span>
        </div>
    </div>
  </div>
</template>

<script>
//加载组件
import Lottie from "vue-lottie";
import * as animationData from "./json/waiting.json";
export default {
    components: {
        Lottie
    },
    data() {
        return {
            //loading
            defaultOptions: {
                animationData: animationData.default
            },
            //登录动画
            loginClass: "des-login",
            loginData: {
				username: "18988407031",
				password: "123456",
				type: "password"
            }
        };
    },
    methods: {
       
        handleLoginSubmit() {
			this.$refs["loginForm"].validate(async (valid) => {
				if (valid) {
					this.loginClass="des-login activeLogin";
					var loginRes=await this.$store.dispatch("upms/userLogin",this.loginData);
					this.loginClass="des-login";
					if(loginRes.state==1){
						this.$notify({
							title: '提示',
							message:loginRes.msg,
							type: 'success'
						});
						this.$router.replace({
							name:"Home"
						});
					}else{
						this.$notify.error({
							title: '提示',
							message:loginRes.msg
						});
					}
				}
			});
        }
    }
};
</script>
