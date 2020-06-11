import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

Vue.config.ignoredElements = [/^ion-/] // Allow ionicons
Vue.config.devtools = true // Enable devtools on production
