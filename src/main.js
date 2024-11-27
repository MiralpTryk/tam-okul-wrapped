import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { eventBus } from "./eventBus";
import "primeicons/primeicons.css";
import { useStore } from "vuex";
import axios from "axios";

const app = createApp(App);

app.config.globalProperties.$eventBus = eventBus;
app.use(store);
app.use(router);
app.use(VueSweetalert2);
app.use(useStore);

const knownTLDs = ["com", "net"];

function getDomainExtension(domain) {
  const domainParts = domain.split(".");
  for (let i = domainParts.length - 1; i >= 0; i--) {
    if (knownTLDs.includes(domainParts[i])) {
      return domainParts[i];
    }
  }
  return null;
}

const domain = window.location.hostname;
const subdomain = domain.substring(0, domain.indexOf("."));
const domainExtension = getDomainExtension(domain);

console.log(domainExtension);

const isLocal = process.env.VUE_APP_ENV === "local";

if (isLocal) {
  axios.defaults.baseURL = "https://06000041" + process.env.VUE_APP_API_URL;
  axios.defaults.trialReportURL = `https://06000041.tamokul.${domainExtension}`;
} else {
  axios.defaults.baseURL = `https://${subdomain}${process.env.VUE_APP_API_URL}`;
  axios.defaults.trialReportURL = `https://${subdomain}.tamokul.${domainExtension}`;
}

console.log(axios.defaults.trialReportURL);

export const subdomainTamokul = subdomain + ".tamokul.com";

app.mount("#app");
