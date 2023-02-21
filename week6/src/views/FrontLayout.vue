<template>
  <div>這是前台頁面</div>

  <div class="m-3">
    <RouterLink to="/home" class="text-decoration-none fs-5 fw-bold"
      >首頁</RouterLink
    >
    |
    <RouterLink to="/about" class="text-decoration-none fs-5 fw-bold"
      >關於我們</RouterLink
    >
    |
    <RouterLink to="/products" class="text-decoration-none fs-5 fw-bold"
      >所有產品</RouterLink
    >
    |
    <RouterLink to="/cart" class="text-decoration-none fs-5 fw-bold"
      >檢視購物車</RouterLink
    >
    |
    <RouterLink to="/login" class="text-decoration-none fs-5 fw-bold"
      >登入</RouterLink
    >
  </div>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
export default {
  components: [RouterView],
};
</script>
