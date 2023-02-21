<script>
import { RouterView } from "vue-router";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      data: {},
      isLoading: false,
    };
  },
  components: {
    RouterView,
  },
  mounted() {
    this.$http
      .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
      .then((res) => {
        this.data = res.data.products;
      });
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

<template>
  <div class="container mt-3">
    <VueLoading v-model:active="isLoading"></VueLoading>
    <RouterView />
  </div>
</template>
