import Vue from 'vue'
import ElementUI from 'element-ui'
import infiniteScroll from "vue-infinite-scroll"
import 'element-ui/lib/theme-chalk/index.css' // 避免后期打包样式不同，要放在import App from './App';之前
import App from './App.vue'
import axios from "axios"
import router from './router'
// 导入样式
import '@/assets/css/bootstrap.css'
import '@/assets/css/index.css'
import {Base64} from 'js-base64'

Vue.use(Base64)
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(infiniteScroll)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
