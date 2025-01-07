import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/tailwind.css";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./styles/modal.css";

const app = createApp(App);

// Store ve router kurulumu
app.use(store);
app.use(router);
app.use(VueSweetalert2);

app.mount("#app");
