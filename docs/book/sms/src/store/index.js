import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },

  actions: {},
 
  mutations: {
    setAdminConfig: (state, { type, value }) => {
      console.log(type, value)
      state.adminConfig[type] = value
    },
  },

  getters: {}
})

export default store