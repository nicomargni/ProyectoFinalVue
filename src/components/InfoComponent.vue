<template>
  <div>
    <img :src="producto.imagen" />
    <p v-if="isAdmin">ID: {{ producto.id }}</p>
    <p>{{ producto.nombre }}</p>
    <p>{{ producto.marca }}</p>
    <p>{{ producto.detalle }}</p>
    <p>${{ producto.precio }}</p>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "InfoComponent",

  data() {
    return {
      producto: {},
    };
  },
  computed: {
    isAdmin() {
      return store.state.user.isAdmin;
    },
  },

  mounted() {
    this.producto = this.$route.query.producto;
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px;
}
img {
  width: 25%;
  height: auto;
  margin-bottom: 20px;
}
p {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>