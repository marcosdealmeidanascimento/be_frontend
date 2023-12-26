import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/layout/BaseLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
const routes = [
  {
    path: "/admin",
    component: BaseLayout,
    redirect: "admin/dashboard",
    meta: {
      authRequired: true,
      hidden: true,
    },
    children: [
      {
        path: "/admin/dashboard",
        name: "dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
      },
    ],
  },
  {
    path: "/",
    component: BaseLayout,
    redirect: "home",
    meta: {
      authRequired: true,
      hidden: true,
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/Home.vue"),
        meta: { transition: 'slide-right' },
      },
      {
        path: "/post",
        name: "post",
        component: () => import("../views/home/Post.vue"),
      },
      {
        path: "/createPost",
        name: "createPost",
        component: () => import("../views/home/CreatePost.vue"),
      }
    ],
  },
  {
    path: "/login",
    component: AuthLayout,
    redirect: "login",
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../views/auth/Register.vue"),
      },
      {
        path: "/confirm",
        name: "confirm",
        component: () => import("../views/auth/Confirm.vue"),
      },
      {
        path: "/reset-password",
        name: "reset",
        component: () => import("../views/auth/ResetPassword.vue"),
      },
      {
        path: "/password-recovery",
        name: "forgot",
        component: () => import("../views/auth/Forgot.vue"),
      },
      {
        path: "/resend",
        name: "resend",
        component: () => import("../views/auth/Resend.vue"),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record)) {
    next();
  } else {
    next();
  }
});

export default router;
