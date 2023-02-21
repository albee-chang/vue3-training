import CartList from "./components/CartList.js";
import ProductList from "./components/ProductsList.js";
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
  generateMessage: localize("zh_TW"),
});
const { createApp } = Vue;

const apiUrl = "https://vue3-course-api.hexschool.io";
const apiPath = "albee2022vue";

const productModal = {
  // 當 id 變動時，取得遠端資料，並呈現在畫面上
  props: ["id", "addToCart", "openModal"],
  data() {
    return {
      modal: {},
      tempProduct: {},
      qty: 1,
    };
  },
  template: "#userProductModal",
  watch: {
    id() {
      if (this.id) {
        axios
          .get(`${apiUrl}/v2/api/${apiPath}/product/${this.id}`)
          .then((res) => {
            // console.log("單一產品列表: ", res.data.product);
            this.tempProduct = res.data.product;
            this.modal.show();
          });
      }
    },
  },
  methods: {
    hide() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
    // 監聽 DOM ，當 Modal 被關閉時， id 會被清空
    this.$refs.modal.addEventListener("hidden.bs.modal", (event) => {
      this.openModal(""); //改 ID , 傳入一個空值
    });
  },
};

const app = createApp({
  data() {
    return {
      products: [],
      productId: "",
      cart: {},
      loadingItem: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  components: {
    productModal,
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
    CartList,
    ProductList,
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`).then((res) => {
        //   console.log("產品列表: ", res.data.products);
        this.products = res.data.products;
      });
    },
    openModal(id) {
      this.productId = id;
      // console.log('外部的產品id: ', id);
    },
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      this.loadingItem = product_id;
      axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, { data }).then((res) => {
        alert(res.data.message);
        this.$refs.productModal.hide();
        this.getCartList();
        this.loadingItem = "";
      });
    },
    getCartList() {
      axios.get(`${apiUrl}/v2/api/${apiPath}/cart`).then((res) => {
        // console.log("購物車列表: ", res.data.data);
        this.cart = res.data.data;
      });
    },
    updateCart(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.loadingItem = item.id;
      axios
        .put(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`, { data })
        .then((res) => {
          //   console.log("更新購物車: ", res.data);
          this.getCartList();
          this.loadingItem = "";
        });
    },
    deleteCartItem(item) {
      this.loadingItem = item.id;
      axios
        .delete(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`)
        .then((res) => {
          //   console.log("刪除單一品項: ", res.data);
          this.getCartList();
          this.loadingItem = "";
        });
    },
    deleteAllCart() {
      axios.delete(`${apiUrl}/v2/api/${apiPath}/carts`).then((res) => {
        //   console.log("刪除單一品項: ", res.data);
        this.getCartList();
      });
    },
    createOrder() {
      axios
        .post(`${apiUrl}/v2/api/${apiPath}/order`, { data: this.form })
        .then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCartList();
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCartList();
  },
});
app.mount("#app");
