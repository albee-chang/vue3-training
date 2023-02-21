import { defineStore } from "pinia";
import productsStore from "./productsStore.js";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default defineStore("cart", {
  state: () => ({
    cart: [],
  }),
  actions: {
    getCart() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          console.log(res);
        });
    },
  },
  getters: {
    cartList: ({ cart }) => {
      const { products } = productsStore();
      const carts = cart.map((item) => {
        //單一產品取出
        const product = products.find(
          (product) => product.id === item.productId
        );
        //相同 id 的產品
        return {
          ...item,
          product,
          subtotal: product.price * item.qty,
        };
      });
      const total = carts.reduce((a, b) => a + b.subtotal, 0);
      return {
        carts,
        total,
      };
    },
  },
});
