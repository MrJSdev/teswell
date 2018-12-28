// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Session from './session.js'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.PUSHER_KEY = process.env.VUE_APP_PUSHER_KEY
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Session)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API,
    libraries: 'places'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
