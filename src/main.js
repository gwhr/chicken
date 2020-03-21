/*
 * @Author: your name
 * @Date: 2020-03-06 10:06:24
 * @LastEditTime: 2020-03-10 12:39:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bolg_webd:\私活\鸡-10K\chicken\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.config.productionTip = false
import globalApi from '@/utils/globalApi.js'
// 引入ui库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 工具js
import tool from "./assets/js/tool.js"
Vue.use(tool)

// 字体图标
import './assets/icon/iconfont.css'

// 全局API
Vue.prototype.globalApi = globalApi;


const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'mo',    // 语言标识
  messages: {
    'cn': require('./lang/cn'),   // 中文语言包
    'en': require('./lang/en'),    // 英文语言包
    'mo': require('./lang/mo')     //繁体字
  }
})

import './assets/js/rem.js'
// 通用样式 重置样式
import './assets/css/reset.css'

// 全局组件注册
const requireComponents = require.context(
  './components/assembly',
  true,
  /Base[a-zA-Z]+\.vue$/
)

requireComponents.keys().forEach(fileName=>{
  // 组件实例
  const reqCom = requireComponents(fileName)
  // 截取路径作为组件名
  let reqComName = fileName.split('.vue')[0].split('/')
  reqComName = reqComName[reqComName.length-1]
  // 组件挂载
  Vue.component(reqComName, reqCom.default || reqCom)

})



/* eslint-disable no-new */
const sVue = new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
export const _that =  sVue;
