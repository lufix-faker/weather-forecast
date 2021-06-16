import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import App from './App.vue'
import router from './router'
import store from './store'

import Toast from 'components/common/toast'

// 安装vue-awesome-swiper插件
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false

// 安装toast自定义插件
Vue.use(Toast);

// 注册事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
