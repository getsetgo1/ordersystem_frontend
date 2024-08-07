<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="2" md="4">
        <v-card>
          <v-card-title class="text-h5 text-center"> 로그인 </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="doLogin">
              <v-text-field
                type="email"
                label="email"
                v-model="email"
                required
                prepend-icon="mdi-email"
              >
              </v-text-field>
              <v-text-field
                type="password"
                label="password"
                v-model="password"
                required
                prepend-icon="mdi-lock"
              >
              </v-text-field>
              <v-row>
                <v-col cols="6"
                  ><v-btn type="submit" color="primary" block
                    >로그인</v-btn
                  ></v-col
                >
                <v-col cols="6"
                  ><v-btn color="secondary" block @click="showPasswordModal">비밀번호 변경</v-btn></v-col
                >
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- resetPasswordModal이 true가 될 때 해당 모달창이 보여짐 -->
    <!-- @update:dialog는 modal 컴포넌트가 update:dialog라는 이벤트를 발생시킬 때 실행될 이벤트 핸들러를 정의 -->
    <!--$event는 자식 요소로부터 전달된 값, true/false가 모달로부터 전달 -->
    <ResetPasswordModal
    v-model="resetPassword"
    @update:dialog="resetPassword=$event"
    ></ResetPasswordModal>
  </v-container>
</template>

<script>
import ResetPasswordModal from "./ResetPasswordModal.vue";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
export default {
  components:{
    ResetPasswordModal
  },
  data() {
    return {
      email: "",
      password: "",
      resetPassword:false
    };
  },
  methods: {
    async doLogin() {
      // try catch로 묶어서 login 성공시 token을 console.log로 출력
      try {
        const loginData = {
          email: this.email,
          password: this.password,
        };
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/doLogin`, loginData);
        // localstorage라는 브라우저의 특정 공간에 서버로부터 받아온 토큰값 저장
        const token = response.data.result.token;
        const refreshToken = response.data.result.refreshToken;
        const role = jwtDecode(token).role;
        console.log(jwtDecode(token))
        // localStorage에 저장할 때는 key-value 형식으로 저장해야함
        localStorage.setItem('token',token);
        localStorage.setItem('refreshToken',refreshToken);
        localStorage.setItem('role',role)
        // 홈페이지 콘솔창에서 Application>Local storage 에 저장되는 거 확인

        // this.$router.push("/"); // 이렇게 하면 header는 안 바뀜
        window.location.href='/';

    } catch (e) {
        console.log(e);
      }
    },
    showPasswordModal(){
      this.resetPassword=true;
    }
  },
};
</script>
