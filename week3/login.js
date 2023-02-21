//建立 Vue 元件
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
//生成 Vue 應用程式
createApp({
  data() {
    return {
      user: {
        username: "", //HTML標籤中使用 v-model(雙向綁定) 會自動更新 username
        password: "",
      },
    };
  },
  methods: {
    login() {
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          //登入成功的回傳結果
          // {
          //   "status": true,
          //   "message": "登入成功",
          //   "uid": "...",
          //   "token": "...",
          //   "expired": 1630734430297
          // }
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`;
          //跳轉到產品頁面
          window.location = "products.html";
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
}).mount("#app"); //渲染到畫面上
