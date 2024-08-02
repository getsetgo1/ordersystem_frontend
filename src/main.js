// main.js 는 vue 애플리케이션의 시작점이다
// 저장하면 바로 빌드되서 화면에 바로 적용된다.
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import vuetify from './plugins/vuetify';
// src/router/index.js 파일의 router를 사용하겠다는 선언
// createApp(App).mount('#app')
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
