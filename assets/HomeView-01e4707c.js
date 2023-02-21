import{_ as h,e as p,r as u,o as a,c as o,a as t,d as r,t as b,b as g,w as m,F as v}from"./index-6544174f.js";const{VITE_APP_URL:c,VITE_APP_PATH:n}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",VITE_TEXT:"這是產品的環境",BASE_URL:"/vue3-training/week6/",MODE:"production",DEV:!1,PROD:!0},f={data(){return{products:[],cart:{}}},components:{RouterLink:p},methods:{addToCart(s,i=1){const d={product_id:s,qty:i};this.$http.post(`${c}/v2/api/${n}/cart`,{data:d}).then(e=>{alert(e.data.message),this.getCartList()}).catch(e=>{console.log(e)})},getCartList(){this.$http.get(`${c}/v2/api/${n}/cart`).then(s=>{this.cart=s.data.data})}},mounted(){this.$http.get(`${c}/v2/api/${n}/products/all`).then(s=>{this.products=s.data.products,this.getCartList()})}},P=t("div",{class:"text-secondary mb-2"},[t("i",{class:"bi bi-arrow-right-circle-fill"}),r(" 首頁 ")],-1),T={class:"navbar bg-light"},$={class:"container-fluid"},k=t("span",{class:"navbar-brand",href:"#"},"亂亂賣漫畫店",-1),E={key:0,type:"button",class:"btn nav-link"},V={class:"badge rounded-pill bg-danger text-white"},L={class:"btn btn-outline-success ms-3"},x={key:1},w=t("div",{class:"container mt-5"},[t("img",{src:"https://picsum.photos/1920/1080/?random=3",class:"d-block w-100"})],-1);function A(s,i,d,e,_,R){const l=u("RouterLink");return a(),o(v,null,[P,t("nav",T,[t("div",$,[k,_.cart.carts?(a(),o("button",E,[r(" 購物車 "),t("span",V,b(_.cart.carts.length),1),t("button",L,[g(l,{to:"/cart"},{default:m(()=>[r("查看購物車")]),_:1})])])):(a(),o("div",x,"購物車是空的"))])]),w],64)}const y=h(f,[["render",A]]);export{y as default};
