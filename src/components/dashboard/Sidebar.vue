<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="../../assets/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">IT Team Admin Tool</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../../assets/img/avatar5.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ userName }}</a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <a href="#" class="nav-link" v-on:click="executeMenu('ADMINMAIN')">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                대시보드
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
          </li>
          <li class="nav-header">행정업무</li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-search"></i>
              <p>
                전화업무관리
                <i class="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="#" class="nav-link" v-on:click="executeMenu('ADMINA001')">
                  <i class="far fa-circle nav-icon"></i>
                  <p>사원찾기</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" v-on:click="executeMenu('ADMINA002')">
                  <i class="far fa-circle nav-icon"></i>
                  <p>전화로그</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-header">시스템</li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-search"></i>
              <p>
                DB관리
                <i class="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>테이블 명세서</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  data: function() {
    return {
      userName: "sayho"
    };
  },
  methods: {
    /*
    * executeMenu
    * 메뉴 실행 이벤트를 부모 컴포넌트(Main)로 넘겨주는 함수.
    * emit 대상 component: Main.vue
    * emit 하는 이벤트 명: execute
    * parameter
    * strProgId: 실행할 프로그램ID
    */
    executeMenu: function(strProgId) {
      this.$emit('execute', strProgId);
    }
  },
}
</script>

<style>

</style>