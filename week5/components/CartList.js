export default {
    props:['deleteAllCart','deleteCartItem','cart','loadingItem','updateCart'],
    template:`<div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="deleteAllCart()">
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteCartItem(item)"
            >
            <i class="fas fa-spinner fa-pulse" v-if="loadingItem === item.id"></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <div class="text-success">已套用優惠券</div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group">
                <select
                  name=""
                  id=""
                  class="form-control"
                  v-model="item.qty"
                  @change="updateCart(item)"
                >
                  <option :value="i" v-for="i in 10" :key="i +'inCart'">
                    {{ i }}
                  </option>
                </select>
                <span class="input-group-text" id="basic-addon2"
                  >{{ item.product.unit }}</span
                >
              </div>
            </div>
          </td>
          <td><span>{{ item.product.price }}</span></td>
          <td class="text-end">
            <small class="text-success">折扣價：</small>
            {{ item.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td></td>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>`,
}