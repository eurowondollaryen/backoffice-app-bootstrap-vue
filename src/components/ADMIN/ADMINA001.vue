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
        <div class="col-md-3">
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
        <div class="col-md-3">
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
        <div class="col-md-3">
          <div class="form-group">
            <label>재직여부</label>
            <select-box :valueList="isWorkingList" v-model="inpIsWorking"></select-box>
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
        <div class="col-md-3">
          <div class="form-group">
            <label>테마 선택</label>
            <select-box :valueList="themeList" v-model="themeClass"></select-box>
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
        <div class="col-md-3">
          <div class="form-group">
            <label>datetimepicker</label>
            <input type="datetime-local" class="form-control" v-model="inpDateTime">
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
      <div class="row">
        <button class="btn btn-primary" @click="modalStateChange(true)">파일 업로드 모달 테스트</button>
        <button class="btn btn-info" @click="addRow()">그리드 행 추가</button>
        <button class="btn btn-danger" @click="deleteRow()">그리드 선택 행 삭제</button>
        <button class="btn btn-danger" @click="printCurrentRow()">현재 행 데이터 log</button>
        <button class="btn btn-danger" @click="downloadCsv()">그리드 CSV 다운로드</button>
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-md-12 card p-3">
          <h5><strong>조회 결과</strong></h5>
          <loading-circle v-if="isLoadingCircleVisible" :isLoading="isLoading"/>
          <div class="row">
            <ag-grid-vue
                    style="width: 100%; height: 200px"
                    :class="themeClass"
                    :columnDefs="columnDefs"
                    @grid-ready="onGridReady"
                    :rowSelection="rowSelection"
                    :rowData="rowData"
                    :onCellValueChanged="onCellValueChanged"
                    :context="context"
                    @cell-clicked="onCellClicked"
                    :stopEditingWhenCellsLoseFocus="true"
                    :singleClickEdit="true"
                  >
            </ag-grid-vue>
          </div>
        </div>
        <FileUploadModal 
          :visible="fileUploadModalVislble"
          :title="fileUploadModalTitle"
          :fileIdxx="fileUploadModalFileIdxx"
          :fileNumberLimit="fileUploadModalFileNumberLimit"
          @modalStateChange="modalStateChange"/>
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
import LoadingCircle from "../common/LoadingCircle.vue";
import SelectBox from "../common/SelectBox.vue";
import FileUploadModal from "../common/FileUploadModal.vue";
import commonFunctions from '../../common/commonFunctions.js';
import DeleteButtonRenderer from "../../common/renderers/DeleteButtonRenderer.js";
import CalendarEditor from "../../common/renderers/CalendarEditor.js";

/* eslint-disable vue/no-unused-components */
const stateMappings = {"1": "입고대기", "2": "입고완료"};
export default {
    name: "ADMINA001",
    components: {
      AgGridVue,
      LoadingCircle,
      SelectBox,
      FileUploadModal,
      DeleteButtonRenderer,
      CalendarEditor
    },
    data: function() {
        return {
          menuName: "사원찾기",
          /* 조회 조건 변수들 */
          inpDeptName: "",
          inpEmplName: "",
          inpIsWorking: "0",
          inpDateTime: "",
          /* file upload modal 관련 변수 */
          fileUploadModalVislble: false,
          fileUploadModalTitle: "파일 업로드 테스트",
          fileUploadModalFileIdxx: "",
          fileUploadModalFileNumberLimit: 5,
          /* 테마 텍스트 */
          themeClass: "ag-theme-alpine",
          /* selectbox 선택값 */
          isWorkingList: [{value: "0", text: "전체"}, {value: "1", text: "재직"}, {value: "2", text: "퇴직"}],
          themeList: [{value: "ag-theme-alpine", text: "alpine"}, {value: "ag-theme-alpine-dark", text: "alpine-dark"}],
          /* ag-grid-vue3 관련 변수들 */
          rowData: [],
          rowDataDeleted: [],
          currentRowData: {},
          columnDefs:  [
            {
              headerName: '순번',
              field: 'SEQ',
              editable: true
            },
            {
              headerName: '사번',
              field: 'VENDOR_NAME',
              editable: true
            },
            {
              headerName: '드롭다운 테스트',
              field: 'DIV',
              editable: true,
              width: 120,
              cellEditor: 'agSelectCellEditor',
              cellEditorParams: {
                  values: commonFunctions.extractValues(stateMappings)
              },
              // convert code to value
              valueFormatter: params => {
                  return commonFunctions.lookupValue(stateMappings, params.value);
              },
              // convert value to code
              valueParser: params => {
                  return commonFunctions.lookupKey(stateMappings, params.newValue);
              }
            },
            {
              headerName: '버튼 테스트',
              field: 'DONE_CHK',
              cellRenderer: DeleteButtonRenderer,
              width: 100
            },
            {
              headerName: '캘린더 테스트',
              field: 'DATE',
              editable: true,
              cellEditor: CalendarEditor,
              cellEditorPopup: true,
              width: 200
            }
          ],
          gridApi: null,
          gridColumnApi: null,
          context: null, /* 자식 cell에서 부모에 접근하기 위해 선언 */
          rowSelection: "multiple",
          scrollX: false,
          scrollY: false,
          isLoadingCircleVisible: false,
          isLoading: false
        };
    },
    created: function() {
    },
    beforeMount() {
      this.context = { componentParent: this };/* 자식 cellRenderer에 넘겨줄 부모의 context */
    },
    methods: {
      search01: function() {
        console.log(this.inpDeptName);
        console.log(this.inpEmplName);
      },
      addRow: function() {
        this.rowData.push({SEQ: this.rowData.length+1, DATE: "2022-11-30"});
        this.gridApi.setRowData(this.rowData);
        console.log(this.rowDataDeleted);
      },
      delete01: function(SEQ) {
        alert("[부모 Component]" + SEQ + "번 삭제합니다.");
      },
      deleteRow: function() {
        const selectedRows = this.gridApi.getSelectedRows();
        const selectedSEQ = selectedRows.map(function(row) {
          return row.SEQ;
        });
        const otherRows = this.rowData.filter(function(row) {
          return selectedSEQ.indexOf(row.SEQ) < 0;
        });
        this.rowDataDeleted = selectedRows;
        this.gridApi.setRowData(otherRows);
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
      },
      modalStateChange: function(state) {
        this.fileUploadModalVislble = state;
      },
      onCellClicked: function(event) {
        this.currentRowData = this.rowData[event.rowIndex];
      },
      printCurrentRow: function() {
        console.log(this.currentRowData);
      },
      downloadCsv: function() {
        this.gridApi.exportDataAsCsv({
          fileName: "csv파일명_" + commonFunctions.getClientDate()
        });
      }
    }
};
</script>

<style>
</style>