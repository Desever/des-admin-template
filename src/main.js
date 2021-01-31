import Vue from 'vue'
import Bootstrap from "./bootStrap/BootStrap.vue"
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

console.log(store);

new Vue({
	router,
	store,
	render: h => h(Bootstrap)
}).$mount('#app')

