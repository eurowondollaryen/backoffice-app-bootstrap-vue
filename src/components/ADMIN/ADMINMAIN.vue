<template>
  <div class="card card-default">
    <div class="card-header">
      <h3 class="card-title">{{ menuName }}</h3>

      <div class="card-tools">
        <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
        </button>
        <button type="button" class="btn btn-tool" data-card-widget="remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <div class="row">
        <div class="col-lg-3 col-6" v-for="obj in previewValues" v-bind:key="obj.text">
          <div :class="obj.class">
            <div class="inner">
            <h3>{{ obj.value }}</h3>
            <p>{{ obj.text }}</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.card-body -->
    <div class="card-footer">
      ADMINMAIN
    </div>
  </div>
</template>

<script>
export default {
    name: "ADMINMAIN",
    data: function() {
        return {
          menuName: "대시보드",
          previewValues: [{value: 1, unit: "", text: "금일 전화량", class: "small-box bg-info"}
                          , {value: 2, unit: "", text: "이번 주 누적 전화량", class: "small-box bg-success"}
                          , {value: 3, unit: "", text: "전 주 대비 전화량", class: "small-box bg-warning"}
                          , {value: 4, unit: "", text: "하루 평균 전화 수(누적)", class: "small-box bg-danger"}]
        };
    },
    methods: {

    }
};
</script>

<style>
</style>