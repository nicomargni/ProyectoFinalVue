<template>
  <div>
    <h1>Bienvenido {{ user.name }}</h1>
    <h3 v-if="user.isAdmin">Eres administrador</h3>
    <button @click="logout">Cerrar Sesión</button>

    <div v-if="user.isAdmin">
      <form @submit.prevent="crearProducto">
        <h2>Crear Producto</h2>
        <div>
          <label>Nombre:</label>
          <input type="text" v-model="nombre" />
        </div>
        <div>
          <label>Marca:</label>
          <input type="text" v-model="marca" />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="text" v-model="imagen" />
        </div>
        <div>
          <label>Detalle:</label>
          <input type="text" v-model="detalle" />
        </div>
        <div>
          <label>Precio:</label>
          <input type="text" v-model="precio" />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "ProductosComponent",

  data() {
    return {
      nombre: "",
      marca: "",
      imagen: "",
      detalle: "",
      precio: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  mounted() {},

  methods: {
    ...mapActions(["clearUser"]),
    logout() {
      this.clearUser();
      this.$router.push("/");
    },
    async crearProducto() {
      try {
        await axios.post(
          "https://63d84aeebaa0f79e09a6fb8b.mockapi.io/Productos",
          {
            nombre: this.nombre,
            marca: this.marca,
            imagen: this.imagen,
            detalle: this.detalle,
            precio: this.precio,
          }
        );
        this.nombre = "";
        this.marca = "";
        this.imagen = "";
        this.detalle = "";
        this.precio = "";
        alert("Producto creado exitosamente");
      } catch (error) {
        console.error(error);
        alert("Hubo un error al crear el producto");
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

input {
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