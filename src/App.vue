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

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
