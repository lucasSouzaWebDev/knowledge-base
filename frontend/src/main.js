import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Imx1Y2FzIiwiZW1haWwiOiJsdWNhc0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjY0NTg1NDgwLCJleHAiOjE2NjQ4NDQ2ODB9.I0bGVaQHI3s5NdBRcHHFpzfT-j2qZVJFnhl98w1WsCo'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')