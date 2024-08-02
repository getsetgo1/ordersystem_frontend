<template>
    <!-- HTML 요소의 동적 값 표시 -->
     <!--html요소 안에 중괄호 2번을 사용함으로써 script에 정의된 변수값을 화면에 표시  -->
    <h1>hello world {{language}}</h1>
    <!-- v-model은 양방향 데이터 바인딩 -->
     <!-- :value 문법을 사용하면 단방향 데이터 바인딩 -->
    <input type="text" :value="value1">
    <!-- v-model 문법을 사용하면 양방향 데이터 바인딩 -->
    <input type="text" v-model="value2">
    <button @click="showValue">변수 변경 사항 확인</button>
    <br>
    <h1>{{count}}</h1>
    <button @click="add()" color="primary">증가1</button>

    <br>
    <h1>{{doubleCount}}</h1>
    <br>

    <input type="number" v-model="count2">
    <button @click="add2()" color="primary">증가2</button>

</template>

<script>
    export default{
        data(){
            return{
                language:"python",
                value1:"java",
                value2:"javascript",
                count:0,
                count2:0
            }
        },
        //methods 안에 computed 쓰면 안됨
        // computed는 종속된 반응형 데이터가 변경될 때에 함수를 다시 실행하여 값을 계산하는 함수
        computed:{
            doubleCount(){
                return this.count*2;
            }
        },
        methods:{
            showValue(){
                alert(this.value2);
            },
            add(){
                this.count+=1;
            },
            add2(){
                this.count+=1;
            }
        }
    }
</script>