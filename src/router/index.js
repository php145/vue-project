import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IndexView from "../views/IndexView.vue";
import AverageSalary from "../views/AveSalary.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "",
          name: 'IndexView',
          component: IndexView,
        },
        {
          path: "/AverageSalary",
          name: "averageSalary",
          component: AverageSalary,
        },
      ],
    },
  ],
});

export default router;
