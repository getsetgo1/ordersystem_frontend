<template>
  <h1>장바구니</h1>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center"> 장바구니 목록 </v-col>
    </v-row>
    <v-row>
      <v-col justify="space-between" cols="auto">
        <v-btn @click="clearCart" color="sid_green">장바구니 비우기</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="orderCreate" color="sid_btn1">주문하기</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>제품 ID</th>
              <th>제품명</th>
              <th>주문수량</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in getProductInCarts" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.quantity }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {

  computed: {
    ...mapGetters(["getProductInCarts"]),
  },
  methods: {
    clearCart() {
      this.$store.dispatch("clearCart");
    },
    async orderCreate() {
        //{productId,quantity}
      const orderProducts = (this.getProductInCarts).map(p => {return {productId : p.id, productCount:p.quantity}
      });
      console.log(orderProducts)

      if (orderProducts.length < 1) {
        alert("주문 대상 물건이 없습니다.");
        return;
      }
      const yesOrNo = confirm(
        `${orderProducts.length}개의 상품을 주문하시겠습니까?`
      );
      if (!yesOrNo) {
        console.log("주문이 취소되었습니다.");
        return;
      }
      try {
        await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/order/create`,
          orderProducts
        );
        alert("정상 주문 되었습니다");
        this.clearCart();
      } catch (e) {
        console.log(e);
        alert("주문 실패하였습니다.");
      }
    },
  },
};
</script>
