import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import viewportUnitsBuggyfillHacks from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks'

// viewport polyfill
// window.onload = function () {
//   viewportUnitsBuggyfill.init({
//     hacks: viewportUnitsBuggyfillHacks
//   })
// }
console.log(viewportUnitsBuggyfill)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
