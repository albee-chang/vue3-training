import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import pagination from "./components/pagination.js";
import delModal from "./components/delModal.js";
import productsEdit from "./components/productsEdit.js";
let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "albee2022vue",
      products: [],
      status: false, //預設的產品狀態，確認是編輯或新增所使用的
      tempProduct: {
        imageUrl: [],
      },
      page: {},
    };
  },
  methods: {
    //確認是否為登入狀態
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getData(); // 如果為登入狀態就執行 getData 函式
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "login.html";
          // 如果沒有登入，就進入產品頁面，會自動跳回登入畫面
        });
    },
    //渲染所有產品至畫面上
    getData(page = 1) {
      //參數 page 預設值
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.page = res.data.pagination;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    openModal(status, product) {
      if (status === "new") {
        //建立新的產品
        this.tempProduct = {
          imagesUrl: [],
          id: new Date().getTime(),
        };
        this.status = true;
        productModal.show(); //打開動態視窗
      } else if (status === "edit") {
        //修改產品
        this.tempProduct = { ...product };
        this.status = false;
        productModal.show();
      } else if (status === "delete") {
        //刪除產品
        this.tempProduct = { ...product };
        delProductModal.show();
      }
    },
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = "post";
      //判斷是否為新的產品，如果不是就改成"put" => 編輯產品
      if (!this.status) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = "put";
      }

      axios[http](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          productModal.hide(); //隱藏動態視窗
          this.getData(); //重新取得資料
          this.tempProduct = {};
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          delProductModal.hide();
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
  components: {
    pagination,
    
  },
  mounted() {
    //用一行 JavaScript 創建一個互動視窗:
    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        keyboard: false, //按下 ESC 鍵時關閉互動視窗。
      }
    );

    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false, //按下 ESC 鍵時關閉互動視窗。
      }
    );
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
});
//新增及編輯產品的 元件
app.component("product-modal", productsEdit);
//刪除產品的 元件
app.component("del-product-modal",delModal)
app.mount("#app");
