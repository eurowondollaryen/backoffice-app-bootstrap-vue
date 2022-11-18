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
            <label>부서명</label>
            <input class="form-control"
                   type="text"
                   placeholder="부서명을 입력하세요."
                   v-model="inpDeptName"
                   @keyup="onEnterAutoSearch" />
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
        <div class="col-md-6">
          <div class="form-group">
            <label>이름/사번</label>
            <input class="form-control"
                   type="text"
                   placeholder="이름/사번을 입력하세요."
                   v-model="inpEmplName"
                   @keyup="onEnterAutoSearch" />
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-md-12 card p-3">
          <h5><strong>조회 결과</strong></h5>
          <div class="row">
            <ag-grid-vue
                    style="width: 100%; height: 200px"
                    class="ag-theme-alpine"
                    :columnDefs="columnDefs"
                    @grid-ready="onGridReady"
                    :rowSelection="rowSelection"
                    :rowData="rowData"
                    :onCellValueChanged="onCellValueChanged"
                  >
            </ag-grid-vue>
          </div>
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.card-body -->
    <div class="card-footer">
      ADMINA001
    </div>
  </div>
</template>

<script>

import { AgGridVue } from "ag-grid-vue3";

export default {
    name: "ADMINA001",
    components: {
      AgGridVue
    },
    data: function() {
        return {
          menuName: "사원찾기",
          /* 조회 조건 변수들 */
          inpDeptName: "",
          inpEmplName: "",
          /* ag-grid-vue3 관련 변수들 */
          rowData: [],
          rowDataDeleted: [],
          columnDefs:  [
            {
              headerName: '순번',
              field: 'VENDOR_NO',
              editable: true
            },
            {
              headerName: '사번',
              field: 'VENDOR_NAME',
              editable: true
            },
            {
              headerName: '성명',
              field: 'VENDOR_DIV_CODE',
              editable: true
            }
          ],
          gridApi: null,
          gridColumnApi: null,
          rowSelection: "multiple",
          scrollX: false,
          scrollY: false,
          isLoadingCircleVisible: false,
          isLoading: false
        };
    },
    methods: {
      search01: function() {
        console.log(this.inpDeptName);
        console.log(this.inpEmplName);
      },
      onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      },
      onCellValueChanged: function(e) {//Grid의 값을 변경했을 때 발생하는 이벤트
        if(this.rowData[e.rowIndex].rowType !== "New") this.rowData[e.rowIndex].rowType = "Modified";
      },
      onEnterAutoSearch: function(e) {
        if(e.keyCode === 13) {
          this.search01();
        }
      }
    }
};
</script>

<style>
</style>