<template>
  <div class="text-secondary mb-2">
    <i class="bi bi-arrow-right-circle-fill"></i> 所有產品頁面
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
  <div class="row row-cols-3 g-3 my-3">
    <div class="col" v-for="product in products" :key="product.id">
      <div class="card">
        <img :src="product.imageUrl" class="card-img-top" alt="product.title" />
        <div class="card-body">
          <h6 class="card-title">
            {{ product.title }}
          </h6>
          <span class="float-end text-danger fw-bolder"
            >$ {{ product.price }} 元</span
          >
        </div>
        <div class="card-body text-center">
          <a
            href="#"
            class="btn btn-outline-secondary w-100 mb-1"
            @click.prevent="addToCart(product.id)"
            ><i class="bi bi-cart-check"></i> 加入購物車</a
          >
          <button class="btn btn-success w-100">
            <RouterLink
              :to="`/product/${product.id}`"
              class="text-white text-decoration-none"
            >
              <i class="bi bi-info-circle"></i>
              查看產品細節
            </RouterLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
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
          this.getCartList();
          Swal.fire(`${res.data.message}!`);
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

<style>
img {
  object-fit: cover;
  height: 350px;
}
</style>
