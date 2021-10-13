import Vue from 'vue'
import App from './App.vue'
import "vue-trix"
import socketIOClient from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import router from "./router/router"

if (window.location.hostname === "localhost") {
  const ENDPOINT = "http://127.0.0.1:1337";
} else {
  const ENDPOINT = "https://jsramverk-editor-mamv18.azurewebsites.net";
}
const socket = socketIOClient(ENDPOINT);

Vue.use(new VueSocketIO({
  debug: false,
  connection: socket,
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
