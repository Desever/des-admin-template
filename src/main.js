import Vue from 'vue'
import Bootstrap from "./bootStrap/BootStrap.vue"
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/style/animate.min.css";
Vue.use(ElementUI);


new Vue({
	router,
	store,
	render: h => h(Bootstrap)
}).$mount('#app')

