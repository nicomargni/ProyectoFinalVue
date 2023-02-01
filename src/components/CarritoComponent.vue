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
          <th>Precio final</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in carrito" :key="index">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.marca }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>{{ producto.precio }}</td>
        </tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>Precio final: {{precioFinal}}</th>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "CarritoComponent",

  data() {
    return {};
  },
  computed: {
    ...mapState(['carrito']),
    ...mapGetters(["precioFinal"]),
  },

  mounted() {},

  methods: {},
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

th, td {
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
</style>