<template>
  <div>這是後台頁面</div>

  <div class="m-3">
    <RouterLink to="/admin/products" class="text-decoration-none fs-5 fw-bold"
      >後臺產品列表</RouterLink
    >
    |
    <RouterLink to="/admin/orders" class="text-decoration-none fs-5 fw-bold"
      >後臺訂單列表</RouterLink
    >|
    <RouterLink to="/" class="text-decoration-none fs-5 fw-bold"
      >回到前台首頁</RouterLink
    >
    <button class="btn btn-primary m-3" type="submit" @click.prevent="logout">
      登出
    </button>
  </div>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { RouterView } from "vue-router";
const { VITE_APP_URL } = import.meta.env;
export default {
  components: [RouterView],
  methods: {
    logout() {
      document.cookie = `hexToken=;expires=${new Date()};`;
      this.$router.push("/login");
    },
    //確認是否為登入狀態
    checkLogin() {
      // 取出 Token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common.Authorization = token;
      const url = `${VITE_APP_URL}/api/user/check`;
      this.$http.post(url).then((res) => {
        if (!res.data.success) {
          this.$router.push("/login");
        }
      });
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
