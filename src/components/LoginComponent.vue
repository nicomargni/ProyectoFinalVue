<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Iniciar Sesión</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: "LoginComponent",

  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },

  mounted() {},

  methods: {
    ...mapActions(['setUser']),
    async login () {
      try {
        const { data } = await axios.get('https://63d84aeebaa0f79e09a6fb8b.mockapi.io/Usuarios')
        const user = data.find(user => user.email === this.email && user.password === this.password)
        if (!user) {
          this.error = 'Email o contraseña incorrectos'
        } else {
          this.error = ''
          this.setUser({ name: user.name })
          this.$router.push({ name: 'Products' })
        }
      } catch (error) {
        this.error = 'Ha ocurrido un error al iniciar sesión'
      }
    }
  },
};
</script>

<style>
</style>