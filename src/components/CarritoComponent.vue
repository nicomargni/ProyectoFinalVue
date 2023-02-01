<template>
  <div class="carritoCompras">
    <h1>Carrito de compras</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Accion</th>
          <th>Precio final</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in carrito" :key="index">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.marca }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>{{ producto.precio }}</td>
          <td><button @click="eliminarProducto(index)">Eliminar</button></td>
          <td></td>
        </tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>Precio final: {{ precioFinal }}</th>
      </tbody>
    </table>

    <form @submit.prevent="realizarCompra">
      <div>
        <label for="nombreCompleto">Nombre completo:</label>
        <input type="text" id="nombreCompleto" v-model="form.nombreCompleto" />
      </div>
      <div>
        <label for="provincia">Provincia:</label>
        <input type="text" id="provincia" v-model="form.provincia" />
      </div>
      <div>
        <label for="localidad">Localidad:</label>
        <input type="text" id="localidad" v-model="form.localidad" />
      </div>
      <div>
        <label for="codigoPostal">Código Postal:</label>
        <input type="text" id="codigoPostal" v-model="form.codigoPostal" />
      </div>
      <div>
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="form.direccion" />
      </div>
      <button class="specialButton" type="submit">Realizar compra</button>
    </form>

    <form v-if="isAdmin" @submit.prevent="eliminarPedido">
      <div>
        <label for="id">ID del pedido a eliminar:</label>
        <input type="text" id="id" v-model="id" />
      </div>
      <button class="specialButton" type="submit">Eliminar pedido</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "CarritoComponent",

  data() {
    return {
      id: "",
      form: {
        nombreCompleto: "",
        provincia: "",
        localidad: "",
        codigoPostal: "",
        direccion: "",
        precioFinal: "",
      },
    };
  },
  computed: {
    ...mapState(["carrito"]),
    ...mapGetters(["precioFinal"]),
    ...mapState(["user"]),
    isAdmin() {
      return this.$store.state.user.isAdmin;
    },
  },

  mounted() {},

  methods: {
    eliminarProducto(index) {
      this.$store.dispatch("eliminarProducto", index);
    },
    async realizarCompra() {
      if (
        !this.form.nombreCompleto ||
        !this.form.provincia ||
        !this.form.localidad ||
        !this.form.codigoPostal ||
        !this.form.direccion
      ) {
        return alert("Por favor, complete todos los campos del formulario");
      }

      try {
        // Enviar los datos de la compra a la API
        await axios.post(
          "https://63d84aeebaa0f79e09a6fb8b.mockapi.io/Pedidos",
          {
            nombreCompleto: this.form.nombreCompleto,
            provincia: this.form.provincia,
            localidad: this.form.localidad,
            codigoPostal: this.form.codigoPostal,
            direccion: this.form.direccion,
            productos: this.carrito,
          }
        );

        // Resetear los datos del formulario
        this.form.nombreCompleto = "";
        this.form.provincia = "";
        this.form.localidad = "";
        this.form.codigoPostal = "";
        this.form.direccion = "";

        // Mostrar un mensaje de éxito al usuario
        alert("La compra se realizó con éxito");
      } catch (error) {
        console.error(error);
      }
    },
    async eliminarPedido() {
      if (!window.confirm("¿Está seguro de que desea eliminar el pedido?")) {
        return;
      }

      try {
        await axios.delete(
          `https://63d84aeebaa0f79e09a6fb8b.mockapi.io/Pedidos/${this.id}`
        );
        alert("El pedido se ha eliminado correctamente");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.carritoCompras {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
form {
  width: 500px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f2f2f2;
  border-radius: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

input[type="text"] {
  padding: 10px;
  width: 100%;
}
.specialButton{
    margin: 5px;
}
</style>