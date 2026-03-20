import { createRouter, createWebHistory } from "vue-router";
import MySquares from "../views/MySquares.vue";
import Results from "../views/Results.vue";

const routes = [
  {
    path: "/",
    name: "MySquares",
    component: MySquares,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
