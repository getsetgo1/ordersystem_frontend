<template>
  <v-container>
    <v-row class="d-flex justify-content-between mt-5">
      <v-col>
        <v-form @submit.prevent="searchProducts">
          <v-row>
            <v-col cols="auto">
              <v-select
                v-model="searchType"
                :items="searchOptions"
                item-title="text"
                item-value="value"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-text-field v-model="searchValue" label="Search">
              </v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn type="submit">검색</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col cols="auto" v-if="!isAdmin">
        <v-btn color="secondary" class="mr-2">장바구니</v-btn>
        <v-btn color="success">주문하기</v-btn>
      </v-col>

      <v-col cols="auto" v-if="isAdmin">
        <v-btn href="/product/create" color="success">상품등록</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-h6 text-center">{{
            pageTitle
          }}</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>제품사진</th>
                  <th>제품명</th>
                  <th>가격</th>
                  <th>재고수량</th>
                  <th v-if="!isAdmin">주문수량</th>
                  <th v-if="!isAdmin">주문선택</th>
                  <th v-if="isAdmin">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in productList" :key="p.id">
                  <td>
                    <v-img
                      :src="p.imagePath"
                      style="height: 100px; width: auto"
                    ></v-img>
                  </td>
                  <td>{{ p.name }}</td>
                  <td>{{ p.price }}</td>
                  <td>{{ p.stockQuantity }}</td>
                  <td></td>
                  <td></td>
                  <td v-if="isAdmin">
                    <v-btn color="secondary" @click="deleteProduct(p.id)"
                      >삭제</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["isAdmin", "pageTitle"],
  data() {
    return {
      searchType: "optional",
      searchOptions: [
        { text: "선택", value: "optional" },
        { text: "상품명", value: "name" },
        { text: "카테고리", value: "category" },
      ],
      searchValue: "",
      productList: [],
      pageSize:6,
      currentPage:0,
    };
  },
  created() {
    this.loadProduct();
    window.addEventListener('scroll',this.scrollPagination);
  },
  methods: {
    searchProducts() {},
    deleteProduct(productId) {
      console.log(productId);
    },
    async loadProduct() {
      try {
        // Pageable 객체에 맞게 파라미터 형식으로 데이터를 전송해줘야함
        // 방법 1: {params:{page:10,size:2}}와 같은 형식으로 전송 시 parameter형식으로 변환되어 서버로 전송
        // 방법 2: FormData객체 생성하여 서버로 데이터 전송
        const params={
          size:this.pageSize,
          page:this.currentPage,
        }
        //url에 물음표 달고 들어가는 거랑 똑같은 거
        // params:{}가 필요하기 때문에 {} 쓰는 것
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/product/list`,{params}
        );
        this.productList = response?.data?.result?.content;
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    },
    scrollPagination(){
      alert("scroll 동작");
    }
  },
};
</script>
