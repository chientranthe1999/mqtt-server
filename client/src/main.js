import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/style/index.css'
import '@/plugins/chart'

import ToastMessage from '@/utils/message'
Vue.prototype.$vmess = ToastMessage

import '@/components'

import VueCarousel from 'vue-carousel'
import { Carousel, Slide } from 'vue-carousel'

Vue.use(VueCarousel)

// global components
Vue.component('carousel', Carousel)
Vue.component('slide', Slide)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
