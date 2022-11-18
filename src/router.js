import { createWebHistory, createRouter } from "vue-router";
import Main from "./components/Main.vue";
import LoginForm from "./components/LoginForm.vue";
import NotFound from "./components/NotFound.vue";
import ExampleForm from "./components/ExampleForm.vue";
import VueCookies from "vue-cookies";

//라우팅 정보를 담은 객체
const appName = "IT Team Admin Tool";
const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    meta: {
      authRequired: true,//인증이 필요한 페이지
      title: appName + " - 메인화면"
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
    meta: {
      title: appName + " - 로그인"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
    meta: {
      title: appName + " - 404"
    }
  },
  {
    path: "/test",
    name: "test",
    component: ExampleForm,
    meta: {
      title: appName + " - example"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

//router navigation guard ref: https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/
router.beforeEach(function(to, from, next) {
  //to: 이동할 url에 해당하는 라우팅 객체
  if(to.matched.some(function(routeInfo) {
    return routeInfo.meta.authRequired;
  })) {//이동하고자 하는 경로가 인증이 필요할 경우
    
    //로그인 했으나 토큰이 만료되었을 경우
    if(VueCookies.get('token') === null && VueCookies.get("refresh_token") !== null) {
      //todo await refreshToken();
    }
    const localIpAddress = "1";
    //로그인 되었고, 토큰이 유효한 경우
    if(VueCookies.get("token") || localIpAddress) {//IP를 통한 bypass 로직 추가
      if(to.path === "/login") {
        console.log("already logged in ");
        return next("/");//이미 로그인 되어있는 경우, 바로 메인페이지로
      }
      return next();
    }

    console.log("로그인이 필요합니다. :" + to.path);
    next('/login');
  } else {
    if(VueCookies.get("token") && to.path === "/login") return next("/");//이미 로그인 되어있는 경우, 바로 메인페이지로
    
    console.log("routing success: '" + to.path + "'");
    next();
  }
});

//router 이동 시 document title을 자동으로 설정
router.afterEach((to) => {
  const title = to.meta.title === undefined ? appName : to.meta.title;
  document.title = title;
});

export default router;