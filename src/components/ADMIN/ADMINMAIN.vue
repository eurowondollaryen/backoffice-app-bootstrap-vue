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
        <div class="col-lg-3 col-6">

        <div class="small-box bg-info">
        <div class="inner">
        <h3>150</h3>
        <p>New Orders</p>
        </div>
        <div class="icon">
        <i class="ion ion-bag"></i>
        </div>
        <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
        </div>

        <div class="col-lg-3 col-6">

        <div class="small-box bg-success">
        <div class="inner">
        <h3>53<sup style="font-size: 20px">%</sup></h3>
        <p>Bounce Rate</p>
        </div>
        <div class="icon">
        <i class="ion ion-stats-bars"></i>
        </div>
        <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
        </div>

        <div class="col-lg-3 col-6">

        <div class="small-box bg-warning">
        <div class="inner">
        <h3>44</h3>
        <p>User Registrations</p>
        </div>
        <div class="icon">
        <i class="ion ion-person-add"></i>
        </div>
        <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
        </div>

        <div class="col-lg-3 col-6">

        <div class="small-box bg-danger">
        <div class="inner">
        <h3>65</h3>
        <p>Unique Visitors</p>
        </div>
        <div class="icon">
        <i class="ion ion-pie-graph"></i>
        </div>
        <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
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
          menuName: "대시보드"
        };
    },
    methods: {

    }
};
</script>

<style>
</style>