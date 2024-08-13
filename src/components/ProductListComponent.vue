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
        <v-btn @click="addCart" color="secondary" class="mr-2">장바구니</v-btn>
        <v-btn @click="createOrder" color="success">주문하기</v-btn>
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
                  <th class="text-center" v-if="!isAdmin">주문선택</th>
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
                  <td>
                    <v-text-field
                      v-model.number="p.quantity"
                      type="number"
                      style="width:70px"
                    >
                    </v-text-field>
                  </td>
                  <td class="text-center" v-if="!isAdmin">
                    <input type="checkbox" v-model="selected[p.id]">
                  </td>
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
import { mapGetters } from "vuex";

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
      isLastPage:false,
      isLoading:false,
      // selected 예시
      // {1:true, 2:false,3:false,4:true} 이런 식으로 담기게 된다.
      selected:{},
    };
  },
  computed: {
    ...mapGetters(["getProductInCarts"]),
  },
  created() {
    this.loadProduct();
    window.addEventListener('scroll',this.scrollPagination);
  },
  beforeUnmount(){
    window.removeEventListener('scroll',this.scrollPagination);
  },
  methods: {
    deleteProduct(productId) {
      console.log(productId);
    },
    searchProducts(){
      // console.log(this.searchType); // 잘 불러지는 지 테스트
      // console.log(this.searchValue);//  잘 불러지는 지 테스트
      this.productList=[];
      this.currentPage=0;
      this.isLastPage=false;
      this.isLoading=false;

      this.loadProduct();

    },
    async loadProduct() {
      try {
        if(this.isLoading || this.isLastPage) return;

        this.isLoading=true;
        // Pageable 객체에 맞게 파라미터 형식으로 데이터를 전송해줘야함
        // 방법 1: {params:{page:10,size:2}}와 같은 형식으로 전송 시 parameter형식으로 변환되어 서버로 전송
        // 방법 2: FormData객체 생성하여 서버로 데이터 전송
        let params={
          // 페이지네이션을 위한 것 : size, page
          size:this.pageSize,
          page:this.currentPage,
          // 검색을 위한 것 : category, searchName
        }
          // 검색을 위한 것 : category, searchName
          // params={size:5, page:0, category:"fruits"} 또는 {size:5, page:0, name:"apple"}
        if(this.searchType =='name'){
          params.searchName = this.searchValue;
        }
        else if(this.searchType ==='category'){
          params.category = this.searchValue;
        }

        //url에 물음표 달고 들어가는 거랑 똑같은 거
        // params:{}가 필요하기 때문에 {} 쓰는 것
        // localhost:8080/product/list?category=fruits&size=5&page=0 또는 name=apple&size=5&page=0
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/product/list`,{params}
        );

        // this.productList = response?.data?.result?.content; // 이렇게 하면 1번 페이지 부르면 0번 페이지가 사라짐. 그래서 아래와 같이 써야함
        const additionalData = response?.data?.result?.content.map(p=>({...p,quantity:0}));
       
        // 강사님 방식
        // if(additionalData.length==0){
        //   this.isLastPage=true;
        //   return;
        // }

        // 세정이 방식
        this.isLastPage=response?.data?.result?.last;
        this.productList=[...this.productList, ...additionalData];
        this.currentPage++;//로드가 끝났을 때 currentpage를 올려줘야 다음 로드때 올바른 페이지 호출 가능능
        this.isLoading=false;
      } catch (e) {
        console.log(e);
      }
    },
    scrollPagination(){
      // 현재 화면 + 스크롤로 이동한 화면 > 전체화면 -n
      // 위 조건이 성립되면 추가 데이타 로드
      // 전체 화면이 :200px
      // 현재 화면 : 100px+20px
      // 이렇게 하면 영원히 현재화면이 작음
      // 그래서 전체화면 : 200px-100px
      // 로드는 데이터가 없을 때 멈추면 됨
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if(isBottom&&!this.isLastPage &&!this.isLoading){
        this.loadProduct();
      }
    },
    addCart(){
      const orderProducts = Object.keys(this.selected).filter(key=>this.selected[key]).map(key=>{
        const product=this.productList.find(p=>p.id==key);
        return {id:product.id, name:product.name,quantity:product.quantity};
      });
      orderProducts.forEach(p=>this.$store.dispatch("addCart",p));
      // window.location.reload();
      console.log(this.getProductInCarts);
    },
    async createOrder(){
      const orderProducts = Object.keys(this.selected).filter(key=>this.selected[key]).map(key=>{
        const product=this.productList.find(p=>p.id==key);
        return {productId:product.id, productCount:product.quantity};
      })
      if(orderProducts.length<1){
        alert("주문 대상 물건이 없습니다.");
        return;
      }
      const yesOrNo =confirm(`${orderProducts.length}개의 상품을 주문하시겠습니까?`);
      if(!yesOrNo){
        console.log("주문이 취소되었습니다.")
        return;
      }
      try{
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`,orderProducts);
        alert("정상 주문 되었습니다");
      }catch(e){
        console.log(e);
        alert("주문 실패하였습니다.");
      }
    }
  },
};
</script>
