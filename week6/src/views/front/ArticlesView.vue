<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <template v-for="article in articles" :key="article.id">
        <div class="col" v-if="article.isPublic">
          <div class="card">
            <img :src="article.imageUrl" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <div v-html="article.description"></div>
            </div>
            <div class="card-footer">
              <RouterLink
                :to="`/user-article/${article.id}`"
                v-if="article.isPublic"
                class="btn btn-outline-primary"
              >
                文章頁面
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
    };
  },
  components: { RouterLink },
  methods: {
    getArticles(page = 1) {
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/articles?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error.response, "錯誤訊息");
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
