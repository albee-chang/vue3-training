import{S as l}from"./sweetalert2-fb1ab54e.js";import{_,o as p,c as u,a as t,t as i,i as h,F as m}from"./index-74090533.js";const{VITE_APP_URL:a,VITE_APP_PATH:n}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",VITE_TEXT:"這是產品的環境",BASE_URL:"/vue3-training/week6/dist/",MODE:"production",DEV:!1,PROD:!0},g={data(){return{product:{}}},methods:{addToCart(c,s=1){const o={product_id:c,qty:s};this.$http.post(`${a}/v2/api/${n}/cart`,{data:o}).then(r=>{l.fire(`${r.data.message}!`)}).catch(r=>{console.log(r)})}},mounted(){const{id:c}=this.$route.params,s=`${a}/v2/api/${n}/product/${c}`;this.$http.get(s).then(o=>{this.product=o.data.product,console.log(o)}).catch(o=>{console.log(o)})}},P=t("div",null,"單一產品頁面",-1),f={class:"card",height:"300px"},v={class:"card-title mt-2"},T=["src"],E={class:"card-body"},V={class:"card-title fw-bold"},x={class:"card-text"},A=t("hr",null,null,-1),$={class:"card-text"};function w(c,s,o,r,e,d){return p(),u(m,null,[P,t("div",f,[t("h2",v,i(e.product.title),1),t("img",{class:"card-img-top",src:e.product.imageUrl,alt:""},null,8,T),t("div",E,[t("h5",V,i(e.product.title),1),t("p",x,i(e.product.description),1),A,t("p",$,i(e.product.content),1),t("a",{href:"#",class:"btn btn-primary",onClick:s[0]||(s[0]=h(b=>d.addToCart(e.product.id),["prevent"]))}," 加入購物車 ")])])],64)}const k=_(g,[["render",w]]);export{k as default};