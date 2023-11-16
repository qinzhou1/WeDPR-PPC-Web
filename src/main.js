import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import VueI18n from 'vue-i18n' // language
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/a11y-light.css'

Vue.use(VueHighlightJS)
Vue.use(VueI18n)
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: localStorage.getItem('languageSet') || 'zh',
  messages: {
    'zh': require('./language/zh'),
    'en': require('./language/en')
  }
})

const globalVue = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})

export default globalVue
