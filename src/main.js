/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon.css'
import echarts from 'echarts'
import api from './api'
//使用axios
Vue.prototype.$api = api;
// import 'babel-polyfill';
Vue.config.productionTip = false;

// 使用echarts
Vue.prototype.$echarts = echarts;

// 使用element-ui框架
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");