<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>Nombre:</label>
        <input type="text" v-model="form.name" />
      </div>
      <div>
        <label>Apellido:</label>
        <input type="text" v-model="form.surname" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="form.email" />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" v-model="form.password" />
      </div>
      <div>
        <label>Confirmar contraseña:</label>
        <input type="password" v-model="form.confirmPassword" />
      </div>
      <div>
        <label>Es admin:</label>
        <input type="checkbox" v-model="form.isAdmin" />
      </div>
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterComponent",

  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
      },
    };
  },

  mounted() {},

  methods: {
    async submitForm() {
      // validar que las contraseñas coincidan
      if (this.form.password !== this.form.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      try {
        // enviar los datos a la API
        const response = await axios.post(
          "https://63d84aeebaa0f79e09a6fb8b.mockapi.io/Usuarios",
          this.form
        );
        // limpiar el formulario
        this.form = {
          name: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
          isAdmin: false,
        };
        console.log(response);
      } catch (error) {
        // mostrar mensaje de error
      }
    },
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
  }
</style>