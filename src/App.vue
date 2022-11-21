<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <router-view/>
    </div>
  </body>
</template>

<script>
import $ from 'jquery'
import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css"
import "../node_modules/admin-lte/plugins/select2/css/select2.min.css"

export default {
  name: "App",
  components: {
  },
  data: function() {
    return {
      
    };
  },
  methods: {
    initializeSelect2() {
      //Initialize Select2 Elements
      $(".select2").select2();

      //Initialize Select2 Elements
      $(".select2bs4").select2({
        theme: "bootstrap4",
      });
    }
  },
  mounted() {
    this.initializeSelect2()
  }
};
</script>

<style scoped>
@font-face {
	font-family: "NanumGothic";
	src: url("./assets/fonts/NanumGothic/NanumGothic-Regular.woff2") format('woff2');
}
body {
	font-family: "NanumGothic", sans-serif;
	background-color: #F5F5F5;
}
</style>
