<template>
  <h1>생명주기 함수</h1>

  <p>{{ data1 }}</p>
  <p>{{ data2 }}</p>
</template>
<script>
export default {
  data() {
    return {
      data1: "변경될 데이터1",
      data2: "변경될 데이터2",
      data3: "변경될 데이터3",
    };
  },
  //화면이 열리기 전에 실행되는 함수(vue 인스턴스가 생성되기 이전)
  created() {
    this.data2 = "변경된 데이터"; // created : 회원목록 조회에 많이 쓰임
  },
  beforeMount() {
    window.addEventListener("resize", this.resize);
  },
  // 컴포넌트가 화면에서 제거될 때 아래 함수 실행, beforedestory로 사용하기도함
  // 웹소켓, sse 연결 등 서버와의 연결을 끊어주고 나가야하는 시점
  // dom이 열리기 전에 서버와 연결을 시도한다 그래서 created에 서버 연결을 해주고 unmount에서 끊어줌
  // 이거 많이 사용되니까 알아둬!!!
  beforeUnmount(){
    window.removeEventListener('resize',this.resize);
  },
  // vue 컴포넌트들이 DOM에 마운트된 이후(화면이 모두 그려진 이후)에 실행되는 함수
  mounted() {
    console.log("화면이 그려진 이후에 출력");
    this.data3 = "변경된 데이터";
  },
  methods: {
    resize() {
      alert("화면 비율이 변경되고 있습니다");
    },
  },
};
</script>
