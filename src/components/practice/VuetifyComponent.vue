<template>
    <v-app-bar app>
        네비게이션 바
    </v-app-bar>

    <!-- v-container, v-row, v-col -->
    <v-container >
        <v-row>
            <!-- cols는 전체 넓은 가로 길이 -->
            <v-col cols="8">
                helloworld1
            </v-col>
            <v-col cols="4">
                helloworld2
            </v-col>
        </v-row>
        <v-row>
            <!-- cols는 전체 넓은 가로 길이 -->
            <!-- v-card -->
             <v-card width="50%">
                <!-- card title(제목) card-text(내용) -->
                <v-card-title>안내문</v-card-title>
                <v-card-text>안녕하세요</v-card-text>
             </v-card>
             <v-card width="50%">
                <!-- card title(제목) card-text(내용) -->
                <v-card-title>안내문</v-card-title>
                <v-card-text>안녕하세요</v-card-text>
             </v-card>
        </v-row>
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>이름</tr>
                    <tr>이메일</tr>
                </thead>
                <tbody>
                    <tr>
                        <td>hong1</td>
                        <td>hong1@naver.com</td>
                    </tr>
                    <tr>
                        <td>hong2</td>
                        <td>hong2@naver.com</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>

    </v-container>
    <v-card>
        <v-card-title>회원가입</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                label="email"
                type="email"
                >
                    
                </v-text-field>
                <v-text-field
                label="name"
                type="text"
                >

                </v-text-field>
                <v-text-field
                label="password"
                type="password"
                >

                </v-text-field>
                <v-btn color="primary">제출하기</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
    <br>
    <v-btn @click.stop="cancel()">취소</v-btn>
    <!-- 모달창을 위한 v-dialog -->
     <v-dialog v-model="dialog" max-width="400px">
        <v-card>
            <v-card-title>정말 취소하시겠습니까?</v-card-title>
            <v-card-actions>
                <v-btn color="primary">확인</v-btn>
                <v-btn color="secondary" @click="dialog=false">취소</v-btn>
            </v-card-actions>
        </v-card>

     </v-dialog>
     <v-btn href="/practice/modeling">일반라우팅</v-btn>
     <v-btn :to="{path:'/practice/modeling'}">SPA라우팅(router 기능 활용)</v-btn> 
     <v-btn :to="{name:'ModelingComponent'}">SPA라우팅(name 호출)</v-btn> 
     
     <!-- 화면 새로고침이 없어서 spa(single page application)라우팅을 많이 쓴다 -->
     <!-- 정보가 실시간으로 바뀌는 경우는 새로고침이 필요하기 때문에 일반라우팅을 써야 좋음 -->
    <!-- 1. reload 방식 : 전체 리로드-> created() 함수 호출됨 ex) 주문 목록 조회 등등 -->
    <!-- 2. spa 방식 : created 함수 호출 안 됨 -->
    </template>

<script>
    export default{
        // 변수 설정 : data()함수를 통해 변수 세팅
        data(){return{dialog:false}},
        methods:{
            cancel(){
                this.dialog=true;
                //this를 써야 data 안에서 정의한 변수 지정이 됨
            }
        }
    }
</script>