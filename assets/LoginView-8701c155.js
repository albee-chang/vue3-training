import{S as l}from"./sweetalert2-fb1ab54e.js";import{_ as u,o as m,c as p,a as e,i as _,h as d,j as c}from"./index-6544174f.js";const{VITE_APP_URL:f}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"albee2022vue",VITE_TEXT:"這是產品的環境",BASE_URL:"/vue3-training/week6/",MODE:"production",DEV:!1,PROD:!0},h={data(){return{user:{username:"",password:""}}},methods:{login(){const n=`${f}/v2/admin/signin`;this.$http.post(n,this.user).then(s=>{const{token:r,expired:i}=s.data;document.cookie=`hexToken=${r};expires=${new Date(i)};`,l.fire(`${s.data.message}`),this.$router.push("/admin")}).catch(s=>{l.fire(`${s.response.data.message}`)})}}},g={class:"container"},w={class:"row justify-content-center"},v=e("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1),P={class:"col-8"},b={class:"form-floating mb-3"},E=e("label",{for:"floatingInput"},"Email address",-1),x={class:"form-floating"},T=e("label",{for:"floatingPassword"},"Password",-1),V=e("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1);function k(n,s,r,i,t,a){return m(),p("div",g,[e("div",w,[v,e("div",P,[e("form",{class:"form-signin",onSubmit:s[2]||(s[2]=_((...o)=>a.login&&a.login(...o),["prevent"]))},[e("div",b,[d(e("input",{type:"email",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=o=>t.user.username=o),id:"floatingInput",placeholder:"name@example.com",required:"",autofocus:""},null,512),[[c,t.user.username]]),E]),e("div",x,[d(e("input",{type:"password",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=o=>t.user.password=o),id:"floatingPassword",placeholder:"Password",required:""},null,512),[[c,t.user.password]]),T]),V],32)])])])}const A=u(h,[["render",k]]);export{A as default};
