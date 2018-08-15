import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const sms = r => require.ensure([], () => r(require('@/components/sms')), 'sms')

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/sms', name: 'sms', component: sms },
    { path: '/', redirect: '/sms' }
  ]
})