import{_,e as h,r as p,o,c as i,a as t,F as n,f as u,t as g,k as m,w as f,d as L,g as r}from"./index-efdcecb0.js";const{VITE_APP_URL:P,VITE_APP_PATH:k}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",VITE_TEXT:"這是產品的環境",BASE_URL:"/live-vue3-training-chapter-works-main/week6/dist/",MODE:"production",DEV:!1,PROD:!0},v={data(){return{articles:[],isLoading:!1,isNew:!1,tempArticle:{}}},components:{RouterLink:h},methods:{getArticles(a=1){const c=`${P}/api/${k}/articles?page=${a}`;this.isLoading=!0,this.$http.get(c).then(e=>{this.articles=e.data.articles,this.pagination=e.data.pagination,this.isLoading=!1}).catch(e=>{this.isLoading=!1,console.log(e.response,"錯誤訊息")})}},created(){this.getArticles()}},T={class:"container"},A={class:"row row-cols-1 row-cols-md-2 g-4"},E={key:0,class:"col"},V={class:"card"},w=["src"],$={class:"card-body"},R={class:"card-title"},b=["innerHTML"],x={class:"card-footer"};function y(a,c,e,B,d,I){const l=p("RouterLink");return o(),i("div",T,[t("div",A,[(o(!0),i(n,null,u(d.articles,s=>(o(),i(n,{key:s.id},[s.isPublic?(o(),i("div",E,[t("div",V,[t("img",{src:s.imageUrl,class:"card-img-top"},null,8,w),t("div",$,[t("h5",R,g(s.title),1),t("div",{innerHTML:s.description},null,8,b)]),t("div",x,[s.isPublic?(o(),m(l,{key:0,to:`/user-article/${s.id}`,class:"btn btn-outline-primary"},{default:f(()=>[L(" 文章頁面 ")]),_:2},1032,["to"])):r("",!0)])])])):r("",!0)],64))),128))])])}const H=_(v,[["render",y]]);export{H as default};
