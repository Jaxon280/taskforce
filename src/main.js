import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import firebase from 'firebase';

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBFs2TdHobxX0HzOqd5cd9_LaoyRTbg-8k",
  authDomain: "barbarossa-f5efb.firebaseapp.com",
  databaseURL: "https://barbarossa-f5efb.firebaseio.com",
  projectId: "barbarossa-f5efb",
  storageBucket: "",
  messagingSenderId: "443451452239",
  appId: "1:443451452239:web:8ef20e1d6c6c1e79"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
