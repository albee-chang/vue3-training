//匯出 分頁元件
export default {
  props: ["pages","getData"],
  template: `<nav aria-label="Page navigation example">
 <ul class="pagination">

   <li class="page-item"
   :class = "{ disabled: !pages.has_pre }">
     <a class="page-link" href="#" aria-label="Previous"
     @click.prevent="getData(pages.current_page -1 )">
       <span aria-hidden="true">&laquo;</span>
     </a>
   </li>

   <li class="page-item"
   :class = "{ active: page === pages.current_page }"
   v-for="page in pages.total_pages" :key="page + 'page'">
     <a class="page-link" href="#"
     @click.prevent="$emit('change-page',page)">{{ page }}</a>
   </li>
   
   
   <li class="page-item"
   :class = "{ disabled: !pages.has_next }">
     <a class="page-link" href="#" aria-label="Next"
     @click.prevent="getData(pages.current_page +1 )">
       <span aria-hidden="true">&raquo;</span>
     </a>
   </li>
 </ul>
</nav>`,
};
