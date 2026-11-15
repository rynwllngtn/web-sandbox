import "./styles/style.css";
import "./styles/shared.css";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#index");