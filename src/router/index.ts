import { createRouter, createWebHistory } from "vue-router";

import SignIn from "@/auth/SignIn/index.vue";
import SignUp from "@/auth/SignUp/index.vue";
import Home from "@/pages/Home/index.vue";
import Courses from "@/pages/Courses/index.vue";
import About from "@/pages/About/index.vue";
import LearningObjects from "@/pages/LearningObjects/index.vue";
import AuthLayout from "@/auth/Layout/index.vue";
import PageLayout from "@/pages/Layout/index.vue";
import session from "@/store/session";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: PageLayout,
      children: [
        { path: "", name: "Home", component: Home },
        { path: "about", name: "About", component: About },
        {
          path: "courses",
          name: "Courses",
          component: Courses,
          beforeEnter: () => {
            if (!session.accessToken) return { name: "SignIn" };
          },
        },
        {
          path: "learning-objects",
          name: "LearningObjects",
          component: LearningObjects,
          beforeEnter: () => {
            if (!session.accessToken) return { name: "SignIn" };
            if (!session.isStaffSession) return { name: "Home" };
          },
        },
      ],
    },
    {
      path: "/",
      component: AuthLayout,
      beforeEnter: () => {
        if (session.accessToken) return { name: "Home" };
      },
      children: [
        {
          path: "signin",
          name: "SignIn",
          component: SignIn,
        },
        {
          path: "signup",
          name: "SignUp",
          component: SignUp,
        },
      ],
    },
  ],
});

export default router;
