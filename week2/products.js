import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "albee2022vue",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    //step 1 : 先確認是否為登入狀態
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getData(); // 如果為登入狀態就執行 getData 函式
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
          // 如果沒有登入，就進入產品頁面，會自動跳回登入畫面
        });
    },
    // step 2 : 渲染所有產品至畫面上
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // step 3 : 點擊單一產品，會顯示到右方列表
    //HTML 按鈕標籤中綁定 @click="openProduct(item)" 會觸發 openProduct 函式，並帶入參數 item
    openProduct(item) {
      this.tempProduct = item;
    },
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
}).mount("#app");
