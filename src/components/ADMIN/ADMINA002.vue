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
        <div class="col-md-6">
          <div class="form-group">
            <label>Minimal</label>
            <select class="form-control select2" style="width: 100%">
              <option selected="selected">Alabama</option>
              <option>Alaska</option>
              <option>California</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
          <div class="form-group">
            <label>Disabled</label>
            <select
              class="form-control select2"
              disabled="disabled"
              style="width: 100%"
            >
              <option selected="selected">Alabama</option>
              <option>Alaska</option>
              <option>California</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
        <div class="col-md-6">
          <div class="form-group">
            <label>Multiple</label>
            <select
              class="select2"
              multiple="multiple"
              data-placeholder="Select a State"
              style="width: 100%"
            >
              <option>Alabama</option>
              <option>Alaska</option>
              <option>California</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
          <div class="form-group">
            <label>Disabled Result</label>
            <select class="form-control select2" style="width: 100%">
              <option selected="selected">Alabama</option>
              <option>Alaska</option>
              <option disabled="disabled">California (disabled)</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->

    </div>
    <!-- /.card-body -->
    <div class="card-footer">
      ADMINA002
    </div>
  </div>
</template>

<script>
export default {
    name: "ADMINA002",
    data: function() {
        return {
          menuName: "콜로그 작성"
        };
    },
    methods: {

    }
};
</script>

<style>
</style>