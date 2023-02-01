<template>
  <div>
    <h1>Bienvenido {{ user.name }}</h1>
    <h3 v-if="user.isAdmin">Eres administrador</h3>
    <button @click="logout">Cerrar Sesión</button>

    <div v-if="user.isAdmin" class="crear">
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
    <div class="displayProducts">
      <h1>Productos</h1>
      <div class="card-container">
        <div v-for="producto in productos" :key="producto.id">
          <div class="card">
            <img :src="producto.imagen" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ producto.nombre }}</h5>
              <p class="card-text">Marca: {{ producto.marca }}</p>
              <p class="card-text">Precio: {{ producto.precio }}</p>
              <div class="btn-group">
                <button
                  v-if="!isAdmin"
                  class="btn btn-primary"
                  @click="agregarAlCarrito(producto)"
                >
                  Comprar
                </button>
                <button
                  class="btn btn-secondary"
                  @click="infoHandler(producto)"
                >
                  Info
                </button>
                <button
                  v-if="isAdmin"
                  class="btn btn-danger"
                  @click="removeProduct(producto)"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import axios from "axios";
import Toastify from 'toastify-js'

export default {
  name: "ProductosComponent",

  data() {
    return {
      productos: [],
      nombre: "",
      marca: "",
      imagen: "",
      detalle: "",
      precio: "",
    };
  },
  computed: {
    ...mapState(["user"]),
    isAdmin() {
      return this.$store.state.user.isAdmin;
    },
    ...mapState(["productos"]),
  },

  mounted() {
    this.obtenerProductos();
  },

  methods: {
    ...mapActions(["clearUser"]),
    logout() {
      this.clearUser();
      this.$store.commit("vaciarCarrito");
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
    async obtenerProductos() {
      try {
        const respuesta = await axios.get(
          "https://63d84aeebaa0f79e09a6fb8b.mockapi.io/Productos"
        );
        this.productos = respuesta.data;
      } catch (error) {
        console.error(error);
        alert("Hubo un error al obtener los productos");
      }
    },
    infoHandler(producto) {
      this.$router.push({
        path: "/Info",
        query: {
          producto: producto,
        },
      });
    },
    async removeProduct(producto) {
      if (
        confirm(
          `Estás seguro de querer eliminar el producto ${producto.nombre}?`
        )
      ) {
        try {
          await axios.delete(
            `https://63d84aeebaa0f79e09a6fb8b.mockapi.io/Productos/${producto.id}`
          );
          this.productos = this.productos.filter((p) => p.id !== producto.id);
          Toastify({
            text: "Producto eliminado correctamente",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();
        } catch (error) {
          console.error(error);
          alert("Hubo un error al eliminar el producto");
        }
      }
    },
    ...mapActions(["agregarAlCarrito"]),
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
.card {
  width: 300px;
  height: 450px;
  display: inline-block;
  margin: 10px;
}
.card-img-top {
  width: 100%;
  height: 200px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.displayProducts {
  margin-top: 30px;
}
.crear {
  margin: 20px;
}
</style>