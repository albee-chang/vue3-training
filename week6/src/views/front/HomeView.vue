<template>
  <div class="text-secondary mb-2">
    <i class="bi bi-arrow-right-circle-fill"></i> 首頁
  </div>
  <nav class="navbar bg-light">
    <div class="container-fluid">
      <span class="navbar-brand" href="#">亂亂賣漫畫店</span>
      <button type="button" class="btn nav-link" v-if="cart.carts">
        購物車
        <span class="badge rounded-pill bg-danger text-white">{{
          cart.carts.length
        }}</span>
        <button class="btn btn-outline-success ms-3">
          <RouterLink to="/cart">查看購物車</RouterLink>
        </button>
      </button>
      <div v-else>購物車是空的</div>
    </div>
  </nav>
  <div class="container mt-5">
    <img
      src="https://picsum.photos/1920/1080/?random=3"
      class="d-block w-100"
    />
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      cart: {},
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      this.$http
        .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCartList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCartList() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          // console.log("購物車列表: ", res.data.data);
          this.cart = res.data.data;
        });
    },
  },
  mounted() {
    this.$http
      .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
      .then((res) => {
        this.products = res.data.products;
        this.getCartList();
      });
  },
};
</script>
<style lang="scss"></style>
