import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carrito: [],
    user: JSON.parse(localStorage.getItem('user')) || {
      name: '',
      isAdmin: false
    },
  },
  getters: {
    user: state => state.user,
    precioFinal(state) {
      return state.carrito.reduce((acumulador, producto) => {
        return acumulador + producto.precioTotal;
      }, 0);
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    agregarProducto(state, producto) {
      producto.cantidad = producto.cantidad || 1;
      let productoExistente = state.carrito.find(p => p.nombre === producto.nombre && p.marca === producto.marca);
      if (productoExistente) {
        productoExistente.cantidad += producto.cantidad;
        productoExistente.precioTotal = parseInt(productoExistente.precioTotal) + parseInt(producto.precio * producto.cantidad);
      } else {
        state.carrito.push({
          ...producto,
          precioTotal: parseInt(producto.precio * producto.cantidad)
        });
      }
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    clearUser({ commit }) {
      commit('SET_USER', {})
      localStorage.removeItem('user')
    },
    agregarAlCarrito({ commit }, producto) {
      commit("agregarProducto", producto);
    }
  },
  modules: {
  }
})
