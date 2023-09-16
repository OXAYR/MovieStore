import { createRouter, createWebHashHistory } from "vue-router";
import AdminLayout from "../layouts/AdminLayout.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import DashBoardView from "../views/adminviews/DashBoardView.vue";
import AdminMovieListView from "../views/adminviews/AdminMovieListView.vue";
import UserLayout from "../layouts/UserLayout.vue";
import MovieListView from "../views/userviews/MovieListView.vue";
import EditMovie from "../components/admin/EditMovie.vue";
import UserAccount from "../components/user/UserAccount.vue";
import Users from "../components/admin/Users.vue";
import EditUser from "../components/user/EditUser.vue";
import CartView from "../views/userviews/CartView.vue";
import store from "@/store";

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    meta: {
      adminAuth: true,
      requiresAuth: true,
      userAuth: false,
    },
    children: [
      {
        path: "",
        name: DashBoardView,
        component: DashBoardView,
      },
      {
        path: "AdminMovieListView",
        component: AdminMovieListView,
      },
      {
        path: "/edit/:id",
        component: EditMovie,
      },
      {
        path: "users",
        component: Users,
      },
    ],
  },
  {
    path: "/home",
    name: "home",
    component: UserLayout,
    meta: {
      adminAuth: false,
      requiresAuth: true,
      userAuth: true,
    },
    children: [
      {
        path: "",
        name: MovieListView,
        component: MovieListView,
      },
      {
        path: "cart",
        component: CartView,
      },
      {
        path: "userAccount",
        component: UserAccount,
      },
      {
        path: ":userId/updateUser",
        component: EditUser,
      },
    ],
  },
  {
    path: "/",
    name: "login",
    component: LoginView,
  },

  {
    path: "/signup",
    name: "SignUp",
    component: SignUpView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = store.getters["user/getUser"];
    console.log("in the navigation guards------>", authUser.user.userRole);

    if (!authUser.user || !authUser.token) {
      next({ name: "login" });
    } else if (to.meta.adminAuth) {
      if (authUser.user.userRole.toLowerCase() === "admin") {
        next();
      } else {
        next("/home");
      }
    } else if (to.meta.userAuth) {
      if (authUser.user.userRole.toLowerCase() === "user") {
        next();
      } else {
        console.log("I am in admin");
        next("/admin");
      }
    }
  } else {
    next();
  }
});

export default router;
