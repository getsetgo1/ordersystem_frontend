<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title class="text-center text-h5"> 회원목록</v-card-title>
          <v-card-text>
            <!-- tableHeaders랑 memberList는 내가 쓰는 변수명 -->
            <v-data-table :headers="tableHeaders" :items="memberList">
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      // title:ID 는 이렇게 쓰는 게 맞음!!! 걱정말고 이거로 reference 써
      tableHeaders: [
        { title: "ID", key: "id", align: "center" },
        { title: "이름", key: "name", align: "center" },
        { title: "EMAIL", key: "email", align: "center" },
        { title: "주문수량", key: "orderCount", align: "center" },
      ],
      memberList: [],
    };
  },
  async created() {
    //response 2번째에는 토큰 헤더가 들어가야함
    // const token = localStorage.getItem("token");
    // {"headers" : {Authorization : 'Bearer 토큰값'}}
    // const headers = { Authorization: `Bearer ${token}` };
    // {headers} 이건 {"headers":headers}임
    // const response = await axios.get(
    //   `${process.env.VUE_APP_API_BASE_URL}/member/list`,
    //   { headers }
    // );
    try{
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`);
    this.memberList=response.data.result.content;
    }
    catch(e){
      console.log(e);
    }
  },
};
</script>
