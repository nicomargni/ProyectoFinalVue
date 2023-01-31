<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Iniciar Sesión</button>
      <button @click="changeRoute">Registrate</button>
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
          this.setUser({ name: user.name, isAdmin: user.isAdmin })
          this.$router.push('../productos')
        }
      } catch (error) {
        this.error = 'Ha ocurrido un error al iniciar sesión'
      }
    },
    changeRoute(){
        this.$router.push('../Register')
    }
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 0 auto;
}

  input,
  select {
    padding: 0.5rem;
    margin-top: 1rem;
    font-size: 1.2rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin: 2px;
  }
</style>