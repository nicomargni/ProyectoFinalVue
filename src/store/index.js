import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      isAdmin: false
    },
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    clearUser ({ commit }) {
      commit('SET_USER', {})
    }
  },
  modules: {
  }
})
