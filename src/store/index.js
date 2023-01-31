import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {
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
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    clearUser({ commit }) {
      commit('SET_USER', {})
      localStorage.removeItem('user')
    }
  },
  modules: {
  }
})
