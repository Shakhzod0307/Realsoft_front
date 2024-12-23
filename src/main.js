import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import i18n from './i18n';
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(i18n);
app.mount('#app')
