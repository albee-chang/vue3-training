<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/user-articles">部落格列表</RouterLink>
        </li>
        <!-- <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li> -->
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <!-- <h2>{{ article.title }}</h2> -->
        <p>
          <small class="text-muted">{{ article.create_at }}</small>
          -
          <small class="text-muted">作者：{{ article.author }}</small>
        </p>
        <img :src="article.imageUrl" alt="" class="img-fluid mb-3" />
        <div v-html="article.content"></div>
      </article>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      article: {},
      id: "",
    };
  },
  components: { RouterLink },
  methods: {
    getArticle() {
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/article/${this.id}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.article = res.data.article;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error.response, "錯誤訊息");
        });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getArticle();
  },
};
</script>
