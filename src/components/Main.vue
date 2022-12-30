<template>
    <Navbar></Navbar>
    <Sidebar v-on:execute="executeMenu"></Sidebar>

    <div class="content-wrapper">
    
    <ContentHeader></ContentHeader>

    <section class="content">
        <div class="container-fluid">
        <component :is="currentComponent"></component>
        </div>
    </section>
    
    </div>
    
    <Footer></Footer>
    <ControlSidebar></ControlSidebar>
</template>

<script>
import ContentHeader from "./dashboard/ContentHeader.vue";
import Navbar from "./dashboard/Navbar.vue";
import Sidebar from "./dashboard/Sidebar.vue";
import Footer from "./dashboard/Footer.vue";
import ControlSidebar from "./dashboard/ControlSidebar.vue";
import ADMINMAIN from "./ADMIN/ADMINMAIN.vue";
import ADMINA001 from "./ADMIN/ADMINA001.vue";
import ADMINA002 from "./ADMIN/ADMINA002.vue";
import Calendar from "./ADMIN/Calendar.vue";

export default {
  name: "Main",
  components: {
    ContentHeader,
    Navbar,
    Sidebar,
    Footer,
    ControlSidebar,
    ADMINMAIN,
    ADMINA001,
    ADMINA002,
    Calendar
  },
  data: function() {
    return {
      currentComponent: "ADMINMAIN"
    };
  },
  methods: {
    /*
    * executeMenu
    * 자식 Component인 Sidebar로부터 받은 메뉴ID를 실행한다.
    * emit 대상 component: Main.vue
    * emit 하는 이벤트 명: execute
    * parameter
    * strProgId: 실행할 프로그램ID
    */
    executeMenu: function(strProgId) {
      this.currentComponent = strProgId;
    }
  },
  mounted() {
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
