<template>
    <!-- vuetifycomponent에서는 template 안에서 이동, 여기는 script안에서 이동 -->
    <h1>화면 라우팅 테스트</h1>
    <div><button @click="spaMove1">modeling 페이지로 이동(url)</button></div>
    <div><button @click="spaMove2">modeling 페이지로 이동(name)</button></div>
    <div><button @click="hrefMove">modeling 페이지로 이동(href)</button></div>
    <div><button @click="reloadPage">현재 화면 reload</button></div>
</template>
<script>
    
export default {
    data() {
        return {

        }
    },
    methods:{
        spaMove1(){
            this.$router.push("/practice/modeling");
        },
        // 여기에서 name은 router/practiceRouter에서 말한 name으로 지정
        spaMove2(){
            this.$router.push({name:"ModelingComponent"});
        },
        hrefMove(){
            window.location.href='/practice/modeling';
        },
        reloadPage(){
            window.location.reload();
        }
    }
}
</script>