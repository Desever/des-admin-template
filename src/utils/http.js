import axios from 'axios';
import { getToken } from "./user";
// 引入配置文件
import config from '@/config'
// 引入工具
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// api地址
const base = process.env.NODE_ENV === 'production'
	? config.baseUrl.pro
	: config.baseUrl.dev;

export const baseUrl = base;
// get
export const getData = (getUrl) => {
	return Promise.race([
		new Promise((resolve, reject) => {
			axios.get(base + getUrl, {
				headers: {
					'Authorization': getToken()
				},
			})
				.then((response) => {
					if (response.data.code == 200) {
						resolve({
							state: 1,
							msg: response.data.message,
							data: response.data.data
						})
					} else {
						if (response.data.code == 401) {
							
							resolve({
								state: 0,
								msg: '重新登陆'
							})
						} else if (response.data.code == 402) {
							resolve({
								state: 402,
								msg: response.data.message,
								data: response.data.data
							})
						} else {

							resolve({
								state: 0,
								msg: response.data.message
							})
						}
					}
				})
				.catch((error) => {
					resolve({
						state: 0,
						msg: '网络错误，请联系管理员'
					})
				})
		}),
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					'state': 0,
					'msg': '请求超时'
				})
			}, 60000)
		})
	])
}
// post
// globeVue 全局vue对象
export const postData = (postUrl, param) => {
	return Promise.race([
		new Promise((resolve, reject) => {
			axios.post(base + postUrl, param, {
				headers: {
					'Authorization': getToken()
				},
			})
				.then((response) => {
					if (response.data.code == 200) {
						resolve({
							'state': 1,
							'msg': response.data.message,
							'data': response.data.data
						})
					} else {
						if (response.data.code == 401) {
							resolve({
								state: 0,
								msg: '重新登陆'
							})
						} else if (response.data.code == 402) {
							// 402需要认证
							// 登录接口
							// 403没有权限
							// 100需要等待
							resolve({
								state: 402,
								msg: response.data.message,
								data: response.data.data
							})
						} else {
							resolve({
								state: 0,
								msg: response.data.message
							})
						}
					}
				})
				.catch((error, response) => {
					resolve({
						state: 0,
						msg: '网络错误，请联系管理员'
					})
				})
		}),
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					'state': 0,
					'msg': '请求超时'
				})
			}, 60000)
		})
	])
}
